package com.pilot.watchstore.services;

import com.pilot.watchstore.model.Cart;

import java.security.Principal;

public interface CartService {

    Cart getCart (Principal activeCustomer);

    void emptyCart(Cart cart);

    Cart addToCart(String quantity, Long productId, Principal activeCustomer);

}
