package com.pilot.watchstore.services;

import com.pilot.watchstore.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;


public interface CustomerService extends UserDetailsService {

    Customer addCustomer (Customer customer, String url, BindingResult result);

    void confirmCustomer(Long id);

    Customer loadCustomerById (Long customerId);

    void deleteCustomer(Long customerId);

    void enableCustomer(Long customerId);

    void disableCustomer(Long customerId);

    Page<Customer> findAllCustomers(Integer pageNumber);

    Customer getByUsername(String username);

}
