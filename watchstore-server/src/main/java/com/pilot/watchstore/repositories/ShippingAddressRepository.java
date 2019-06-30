package com.pilot.watchstore.repositories;

import com.pilot.watchstore.model.ShippingAddress;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {
}
