package com.pilot.watchstore.services;


import com.pilot.watchstore.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import java.util.Set;

public interface ProductService {

    Iterable<Product> findAll();
    Page<Product> findAllProductsByCategoryName(String categoryName,Integer pageNumber);
    Product findById(Long id);
    Product addProduct(Product product, BindingResult result);
    void deleteProduct(Long id);
    Product editProduct(Product product,Long id,BindingResult result);

    Page<Product> findAllProducts(Integer pageNumber);
    Set<Product> advancedSearch(String categoryOne,
                               String categoryTwo,
                               String categoryThree,
                               String priceLower,
                               String priceUpper,
                               String unitInStock);

}
