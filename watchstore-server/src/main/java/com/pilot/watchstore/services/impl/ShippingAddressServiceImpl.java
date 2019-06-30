package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.exceptions.handlers.RequestedResourceNotFoundException;
import com.pilot.watchstore.exceptions.handlers.ValidationException;
import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.model.ShippingAddress;
import com.pilot.watchstore.repositories.ShippingAddressRepository;
import com.pilot.watchstore.services.CustomerService;
import com.pilot.watchstore.services.ShippingAddressService;
import com.pilot.watchstore.services.validation.MapValidationErrorService;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@Service
public class ShippingAddressServiceImpl implements ShippingAddressService {

    private ShippingAddressRepository shippingAddressRepository;
    private MapValidationErrorService mapValidationErrorService;
    private CustomerService customerService;

    public ShippingAddressServiceImpl(ShippingAddressRepository shippingAddressRepository, MapValidationErrorService mapValidationErrorService, CustomerService customerService) {
        this.shippingAddressRepository = shippingAddressRepository;
        this.mapValidationErrorService = mapValidationErrorService;
        this.customerService = customerService;
    }

    @Override
    public ShippingAddress addShippingAddress(ShippingAddress shippingAddress, Principal activeCustomer, BindingResult result) {

        Customer customer = customerService.getByUsername(activeCustomer.getName());

        Map errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) throw new ValidationException(errorMap);

        customer.setShippingAddress(shippingAddress);

        return shippingAddressRepository.save(shippingAddress);
    }

    @Override
    public ShippingAddress getShippingAddress(Principal activeCustomer) {

        Customer customer = customerService.getByUsername(activeCustomer.getName());
        ShippingAddress shippingAddress = customer.getShippingAddress();
        if (shippingAddress == null)
            throw new RequestedResourceNotFoundException("Shipping address not found!");
        return shippingAddress;
    }

    @Override
    public ShippingAddress editShippingAddress(ShippingAddress newShippingAddress, BindingResult result, Principal activeCustomer) {

        Map errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) throw new ValidationException(errorMap);

        Customer customer = customerService.getByUsername(activeCustomer.getName());
        ShippingAddress existingShippingAddress = customer.getShippingAddress();

        if(existingShippingAddress != null){

            if (!existingShippingAddress.getApartmentNumber().equals(newShippingAddress.getApartmentNumber()))
            existingShippingAddress.setApartmentNumber(newShippingAddress.getApartmentNumber());

            if (!existingShippingAddress.getCity().equals(newShippingAddress.getCity()))
                existingShippingAddress.setCity(newShippingAddress.getCity());

            if (!existingShippingAddress.getState().equals(newShippingAddress.getState()))
                existingShippingAddress.setState(newShippingAddress.getState());

            if (!existingShippingAddress.getStreetName().equals(newShippingAddress.getStreetName()))
                existingShippingAddress.setStreetName(newShippingAddress.getStreetName());

            if (!existingShippingAddress.getZipCode().equals(newShippingAddress.getZipCode()))
                existingShippingAddress.setZipCode(newShippingAddress.getZipCode());

        }else throw new RequestedResourceNotFoundException("You have to provide a shipping address!");

        return shippingAddressRepository.save(existingShippingAddress);
    }
}

