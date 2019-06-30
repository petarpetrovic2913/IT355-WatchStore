package com.pilot.watchstore.controllers;

import com.pilot.watchstore.model.Cart;
import com.pilot.watchstore.services.CartItemService;
import com.pilot.watchstore.services.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/customer/cart")
@CrossOrigin
public class CartController {


   private CartService cartService;
   private CartItemService cartItemService;

    public CartController(CartService cartService, CartItemService cartItemService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public Cart getCart(Principal activeCustomer){
        return cartService.getCart(activeCustomer);
    }

    @PostMapping(value = "/add/{productId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public Cart addToCart(@RequestParam (value = "quantity",required = false) String quantity,@PathVariable(value = "productId") Long productId,Principal activeCustomer){
        return cartService.addToCart(quantity,productId,activeCustomer);
    }


    @DeleteMapping(value = "/remove/{cartItemId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeItemFromCart(@PathVariable (value = "cartItemId") Long cartItemId, Principal activeCustomer){
        cartItemService.removeCartItem(activeCustomer,cartItemId);
    }

}
