package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.model.Category;
import com.pilot.watchstore.repositories.CategoryRepository;
import com.pilot.watchstore.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category findCategory(String name) {

        Iterable<Category> categories = categoryRepository.findAll();
        Category categoryByName = null;

        for(Category category:categories){
            if(category.getCategoryName().equals(name)){
                categoryByName = category;
                break;
            }
        }
        return categoryByName;
    }

    @Override
    public Set<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getByCategoryId(Long id) {
        return categoryRepository.getByCategoryId(id);
    }
}
