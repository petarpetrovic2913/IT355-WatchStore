package com.pilot.watchstore.services;

import java.security.Principal;

public interface CartItemService {

    void removeCartItem(Principal activeCustomer, Long cartItemId);

}
