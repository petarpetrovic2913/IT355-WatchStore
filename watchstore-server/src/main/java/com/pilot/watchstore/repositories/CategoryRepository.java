package com.pilot.watchstore.repositories;

import com.pilot.watchstore.model.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

    Set<Category> findAll();
    Category getByCategoryId(Long id);

}
