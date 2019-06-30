package com.pilot.watchstore.repositories;

import com.pilot.watchstore.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>, PagingAndSortingRepository<Customer, Long> {


    Page<Customer> findAll(Pageable pageable);
    Customer findByUsername(String username);
    Customer getByCustomerId(Long id);

}
