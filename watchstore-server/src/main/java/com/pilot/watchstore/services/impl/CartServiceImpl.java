package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.exceptions.handlers.InvalidParameterException;
import com.pilot.watchstore.exceptions.handlers.RequestedResourceNotFoundException;
import com.pilot.watchstore.model.Cart;
import com.pilot.watchstore.model.CartItem;
import com.pilot.watchstore.model.Customer;
import com.pilot.watchstore.model.Product;
import com.pilot.watchstore.repositories.CartItemRepository;
import com.pilot.watchstore.repositories.ProductRepository;
import com.pilot.watchstore.services.CartService;
import com.pilot.watchstore.services.CustomerService;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Set;


@Service
public class CartServiceImpl implements CartService {

    private CartItemRepository cartItemRepository;
    private ProductRepository productRepository;
    private CustomerService customerService;

    public CartServiceImpl(CartItemRepository cartItemRepository, ProductRepository productRepository, CustomerService customerService) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.customerService = customerService;
    }


    @Override
    public Cart getCart(Principal activeCustomer) {

        Customer customer = customerService.getByUsername(activeCustomer.getName());
        Cart cart = customer.getCart();

        if(cart == null)
            throw new RequestedResourceNotFoundException("Cart is null!");

        return cart;
    }

    @Override
    public void emptyCart(Cart cart) {

        cart.setGrandTotal(0);

        for(CartItem cartItem : cart.getCartItems()){
            cartItemRepository.delete(cartItem);
        }
    }

    @Override
    public Cart addToCart(String q, Long productId, Principal activeCustomer) {

            Customer customer = customerService.getByUsername(activeCustomer.getName());

            if(!NumberUtils.isParsable(q))
                throw new InvalidParameterException("You must select quantity!");

            int quantity = Integer.parseInt(q);

            Cart cart = customer.getCart();
            Product product = productRepository.getByProductId(productId);
            Set<CartItem> cartItems = cart.getCartItems();

            for(CartItem cartItem:cartItems){
                if(product.getProductId() == cartItem.getProduct().getProductId()){
                    if(quantity <= product.getUnitInStock()){
                        cartItem.setQuantity(cartItem.getQuantity() + quantity);
                        cartItem.setTotalPrice(product.getProductPrice()*cartItem.getQuantity());
                        product.setUnitInStock(product.getUnitInStock() - quantity);
                        cart.setGrandTotal(cart.getGrandTotal()+cartItem.getTotalPrice());
                        cartItemRepository.save(cartItem);
                        return cart;
                    }
                    else{
                        throw new InvalidParameterException("Not so much products in stock!");
                    }

                }

            }

            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setTotalPrice(product.getProductPrice()*cartItem.getQuantity());
            cartItem.setCart(cart);
            product.setUnitInStock(product.getUnitInStock()-quantity);
            cart.setGrandTotal(cart.getGrandTotal()+cartItem.getTotalPrice());
            cartItemRepository.save(cartItem);
            return cart;

    }
}
