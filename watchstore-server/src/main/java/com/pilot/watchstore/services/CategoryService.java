package com.pilot.watchstore.services;


import com.pilot.watchstore.model.Category;

import java.util.Set;

public interface CategoryService {

    Category findCategory(String name);
    Set<Category> getAllCategories();
    Category getByCategoryId(Long id);

}
