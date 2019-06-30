package com.pilot.watchstore.services;

import com.pilot.watchstore.model.CustomerOrder;

import java.security.Principal;

public interface CustomerOrderService {

    CustomerOrder addCustomerOrder(Principal activeCustomer);

}
