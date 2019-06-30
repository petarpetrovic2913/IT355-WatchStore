package com.pilot.watchstore.controllers.admin;

import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.services.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/customermanagement")
@CrossOrigin
public class CustomerPanelController {

    private CustomerService customerService;

    public CustomerPanelController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping("/all")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<Customer> getCustomers(@RequestParam(name="pagenum",required = false) Integer pageNumber){
        return customerService.findAllCustomers(pageNumber);
    }

    @GetMapping("/enable/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void enableCustomer(@PathVariable("id") Long id){
        customerService.enableCustomer(id);
    }

    @GetMapping("/disable/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void disableCustomer(@PathVariable("id") Long id){
        customerService.disableCustomer(id);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteCustomer(@PathVariable("id") Long id){
        customerService.deleteCustomer(id);
    }


}
