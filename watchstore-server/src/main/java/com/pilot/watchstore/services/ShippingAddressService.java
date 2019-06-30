package com.pilot.watchstore.services;

import com.pilot.watchstore.model.ShippingAddress;
import org.springframework.validation.BindingResult;

import java.security.Principal;

public interface ShippingAddressService {

    ShippingAddress addShippingAddress(ShippingAddress shippingAddress, Principal activeCustomer, BindingResult result);
    ShippingAddress getShippingAddress(Principal activeCustomer);
    ShippingAddress editShippingAddress(ShippingAddress shippingAddress,BindingResult result,Principal activeCustomer);

}
