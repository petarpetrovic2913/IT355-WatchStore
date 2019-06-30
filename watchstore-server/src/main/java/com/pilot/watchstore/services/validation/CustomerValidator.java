package com.pilot.watchstore.services.validation;

import com.pilot.watchstore.model.Customer;
import org.springframework.stereotype.Component;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class CustomerValidator implements Validator {


    @Override
    public boolean supports(Class<?> aClass) {
        return Customer.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {

            Customer customer = (Customer) o;

            if(customer.getUsername().length() < 8 || customer.getUsername().length() > 254 ){
                errors.rejectValue("username","Length","Username must be between 8 and 254 characters!");
            }

            if(customer.getPassword().length() < 6){
                errors.rejectValue("password","Length","Password must be at least 6 characters");
            }

            if(!customer.getPassword().equals(customer.getConfirmPassword())){
                errors.rejectValue("confirmPassword","Match","Passwords must match!");
            }
    }
}
