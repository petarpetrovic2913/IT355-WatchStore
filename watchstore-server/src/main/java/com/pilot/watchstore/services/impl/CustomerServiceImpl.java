package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.exceptions.handlers.RequestedResourceNotFoundException;
import com.pilot.watchstore.exceptions.handlers.ValueAlreadyExistsException;
import com.pilot.watchstore.exceptions.handlers.ValidationException;
import com.pilot.watchstore.model.Cart;
import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.repositories.CartRepository;
import com.pilot.watchstore.repositories.CustomerRepository;
import com.pilot.watchstore.services.CustomerService;
import com.pilot.watchstore.services.impl.emailServiceAndModel.EmailModel;
import com.pilot.watchstore.services.impl.emailServiceAndModel.EmailService;
import com.pilot.watchstore.services.validation.CustomerValidator;
import com.pilot.watchstore.services.validation.MapValidationErrorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import javax.mail.MessagingException;
import java.util.Map;




@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;
    private CustomerValidator customerValidator;
    private MapValidationErrorService mapValidationErrorService;

    public CustomerServiceImpl(CustomerRepository customerRepository, CartRepository cartRepository, BCryptPasswordEncoder bCryptPasswordEncoder, EmailService emailService, CustomerValidator customerValidator, MapValidationErrorService mapValidationErrorService) {
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
        this.customerValidator = customerValidator;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @Override
    public Customer addCustomer(Customer customer , String url, BindingResult result) {

        customerValidator.validate(customer,result);
        Map errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) throw new ValidationException(errorMap);

        Cart cart = new Cart();

            try{
                customer.setPassword(bCryptPasswordEncoder.encode(customer.getPassword()));

                customer.setConfirmPassword("");
                customer.setCart(cart);
                cartRepository.save(cart);
                customerRepository.save(customer);
                sendConfirmationMail(customer,url);
                return customer;

            }catch(Exception e){
                throw new ValueAlreadyExistsException("Username or Email already exists");
            }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByUsername(username);

        if(customer == null) new RequestedResourceNotFoundException("Customer not found");
        return customer;
    }

    @Override
    @Transactional
    public Customer loadCustomerById(Long customerId) {
        Customer customer = customerRepository.getByCustomerId(customerId);
        if(customer == null) new RequestedResourceNotFoundException("Customer not found");
        return customer;
    }

    @Override
    public void deleteCustomer(Long customerId) {

        Customer customer = customerRepository.getByCustomerId(customerId);
        if(customer == null)
            throw new RequestedResourceNotFoundException("Customer not found");

        customerRepository.delete(customer);
    }

    @Override
    public void enableCustomer(Long customerId) {

        Customer customer = customerRepository.getByCustomerId(customerId);
        if(customer == null)
            throw new RequestedResourceNotFoundException("Customer not found");

        customer.setEnabled(true);
        customer.setRole("USER");
        customerRepository.save(customer);
    }

    @Override
    public void disableCustomer(Long customerId) {

        Customer customer = customerRepository.getByCustomerId(customerId);
        if(customer == null)
            throw new RequestedResourceNotFoundException("Customer not found");

        customer.setEnabled(false);
        customerRepository.save(customer);

    }

    @Override
    public Page<Customer> findAllCustomers(Integer pageNumber) {

        if(pageNumber == null)
            pageNumber = 0;

        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("customerId"));
        Page<Customer> customers = customerRepository.findAll(pageable);

        if(customers == null)
            throw new RequestedResourceNotFoundException("Customers not found");

        return customers;

    }

    @Override
    public Customer getByUsername(String username) {
        return customerRepository.findByUsername(username);
    }


    private void sendConfirmationMail(Customer customer, String url) throws MessagingException {
        EmailModel mail = new EmailModel();
        mail.setTo(customer.getCustomerEmail());
        mail.setFrom("pe.petrovic994@gmail.com");
        mail.setSubject("Confirmation mail");
        mail.setContent("<a href=\'" + url + "/confirmation/" + customer.getCustomerId() + "\' > Confirm mail </a>");

        try {
            emailService.sendMail(mail);
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void confirmCustomer(Long id){
        Customer customer = customerRepository.getByCustomerId(id);
        customer.setEnabled(true);
        customer.setRole("USER");
        customerRepository.save(customer);
    }


}
