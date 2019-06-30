package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.exceptions.handlers.RequestedResourceNotFoundException;
import com.pilot.watchstore.model.Cart;
import com.pilot.watchstore.model.CartItem;
import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.model.Product;
import com.pilot.watchstore.repositories.CartItemRepository;
import com.pilot.watchstore.services.CartItemService;
import com.pilot.watchstore.services.CustomerService;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class CartItemServiceImpl implements CartItemService {

    private CartItemRepository cartItemRepository;
    private CustomerService customerService;

    public CartItemServiceImpl(CartItemRepository cartItemRepository, CustomerService customerService) {
        this.cartItemRepository = cartItemRepository;
        this.customerService = customerService;
    }

    @Override
    public void removeCartItem(Principal activeCustomer, Long cartItemId) {

        Customer customer = customerService.getByUsername(activeCustomer.getName());
        Cart cart = customer.getCart();
        CartItem cartItem = cartItemRepository.getByCartItemId(cartItemId);
        Product product = cartItem.getProduct();

        if(cartItem == null)
            throw new RequestedResourceNotFoundException("CartItem not found!");

        cart.setGrandTotal(cart.getGrandTotal() - cartItem.getTotalPrice());
        product.setUnitInStock(product.getUnitInStock()+cartItem.getQuantity());
        cartItemRepository.delete(cartItem);
    }

}
