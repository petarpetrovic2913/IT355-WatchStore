package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.exceptions.handlers.InvalidParameterException;
import com.pilot.watchstore.exceptions.handlers.RequestedResourceNotFoundException;
import com.pilot.watchstore.model.*;
import com.pilot.watchstore.repositories.CustomerOrderRepository;
import com.pilot.watchstore.services.CartService;
import com.pilot.watchstore.services.CustomerOrderService;
import com.pilot.watchstore.services.CustomerService;
import org.springframework.stereotype.Service;

import java.security.Principal;


@Service
public class CustomerOrderServiceImpl implements CustomerOrderService {

    private CartService cartService;
    private CustomerService customerService;

    private CustomerOrderRepository customerOrderRepository;

    public CustomerOrderServiceImpl(CartService cartService, CustomerService customerService, CustomerOrderRepository customerOrderRepository) {
        this.cartService = cartService;
        this.customerService = customerService;
        this.customerOrderRepository = customerOrderRepository;
    }


    @Override
    public CustomerOrder addCustomerOrder(Principal activeCustomer) {

        Customer customer = customerService.getByUsername(activeCustomer.getName());
        Cart cart = customer.getCart();
        ShippingAddress shippingAddress = customer.getShippingAddress();

        if(shippingAddress == null)
            throw new RequestedResourceNotFoundException("You must provide shipping address");

        if(cart.getGrandTotal() == 0)
            throw new InvalidParameterException("You cannot checkout if the cart is empty.");

        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setCustomer(customer);
        customerOrder.setCart(cart);
        customerOrder.setShippingAddress(shippingAddress);

        customerOrderRepository.save(customerOrder);
        cartService.emptyCart(customerOrder.getCart());

        return customerOrder;
    }


}
