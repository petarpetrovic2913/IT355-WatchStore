package com.pilot.watchstore.repositories;

import com.pilot.watchstore.model.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends CrudRepository<CartItem, Long> {

    CartItem getByCartItemId(Long id);

}
