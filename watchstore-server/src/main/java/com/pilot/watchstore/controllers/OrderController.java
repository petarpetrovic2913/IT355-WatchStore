package com.pilot.watchstore.controllers;

import com.pilot.watchstore.model.CustomerOrder;
import com.pilot.watchstore.model.ShippingAddress;
import com.pilot.watchstore.repositories.ShippingAddressRepository;
import com.pilot.watchstore.services.CustomerOrderService;
import com.pilot.watchstore.services.CustomerService;
import com.pilot.watchstore.services.ShippingAddressService;
import com.pilot.watchstore.services.validation.MapValidationErrorService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin
public class OrderController {

    private CustomerOrderService customerOrderService;
    private ShippingAddressService shippingAddressService;


    public OrderController(CustomerOrderService customerOrderService, CustomerService customerService, ShippingAddressRepository shippingAddressRepository, ShippingAddressService shippingAddressService, MapValidationErrorService mapValidationErrorService) {
        this.customerOrderService = customerOrderService;
        this.shippingAddressService = shippingAddressService;
    }

    @GetMapping("/customer/order")
    @ResponseStatus(value = HttpStatus.OK)
    public CustomerOrder createOrder(Principal activeCustomer) {
        return customerOrderService.addCustomerOrder(activeCustomer);
    }

    @PostMapping("/customer/add/shipping_address")
    @ResponseStatus(value = HttpStatus.OK)
    public ShippingAddress addShippingAddress(@Valid @RequestBody ShippingAddress shippingAddress, BindingResult result ,Principal activeCustomer){
        return shippingAddressService.addShippingAddress(shippingAddress,activeCustomer,result);
    }

    @PutMapping("/customer/edit/shipping_address")
    @ResponseStatus(value = HttpStatus.OK)
    public ShippingAddress editShippingAddress(@Valid @RequestBody ShippingAddress shippingAddress, BindingResult result ,Principal activeCustomer){
        return shippingAddressService.editShippingAddress(shippingAddress,result,activeCustomer);
    }


    @GetMapping("/customer/shipping_address")
    @ResponseStatus(value = HttpStatus.OK)
    public ShippingAddress getShippingAddress(Principal activeCustomer){
        return shippingAddressService.getShippingAddress(activeCustomer);
    }

}
