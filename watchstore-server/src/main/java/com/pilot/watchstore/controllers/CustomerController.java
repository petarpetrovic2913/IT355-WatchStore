package com.pilot.watchstore.controllers;


import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.payload.JwtLoginSuccessResponse;
import com.pilot.watchstore.payload.LoginRequest;
import com.pilot.watchstore.services.AuthentificationService;
import com.pilot.watchstore.services.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;



@RestController
@RequestMapping("/customers")
@CrossOrigin
public class CustomerController {

    private CustomerService customerService;
    private AuthentificationService authentificationService;

    public CustomerController(CustomerService customerService, AuthentificationService authentificationService) {
        this.customerService = customerService;
        this.authentificationService = authentificationService;
    }


    @PostMapping("/register")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Customer registerCustomer(@Valid @RequestBody Customer customer , BindingResult result , HttpServletRequest httpServletRequest){
        return customerService.addCustomer(customer,httpServletRequest.getRequestURL().toString(),result);
    }

    @GetMapping("/register/confirmation/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void confirm(@PathVariable Long id) {
        customerService.confirmCustomer(id);
    }

    @PostMapping("/login")
    @ResponseStatus(value = HttpStatus.OK)
    public JwtLoginSuccessResponse authenticateCustomer(@Valid @RequestBody LoginRequest loginRequest , BindingResult result){

        return authentificationService.customerAuthentification(loginRequest,result);
    }

}
