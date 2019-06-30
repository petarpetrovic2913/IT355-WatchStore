package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.exceptions.handlers.InvalidParameterException;
import com.pilot.watchstore.exceptions.handlers.RequestedResourceNotFoundException;
import com.pilot.watchstore.exceptions.handlers.ValidationException;
import com.pilot.watchstore.exceptions.handlers.ValueAlreadyExistsException;
import com.pilot.watchstore.model.Product;
import com.pilot.watchstore.repositories.ProductRepository;
import com.pilot.watchstore.services.CategoryService;
import com.pilot.watchstore.services.ProductService;
import com.pilot.watchstore.services.validation.MapValidationErrorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.validation.BindingResult;


import java.util.Map;
import java.util.Optional;
import java.util.Set;


@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private CategoryService categoryService;
    private MapValidationErrorService mapValidationErrorService;

    public ProductServiceImpl(ProductRepository productRepository,CategoryService categoryService, MapValidationErrorService mapValidationErrorService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @Override
    public Page<Product> findAllProductsByCategoryName(String categoryName, Integer pageNumber) {

        if(pageNumber == null)
            pageNumber = 0;
        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("productId"));

        Page<Product> products = productRepository.getByCategoryName(categoryName,pageable);

        if(products == null)
            throw new RequestedResourceNotFoundException("There is no products with corresponding category name");

        return products;

    }

    public Iterable<Product> findAll(){
        return productRepository.findAll();
    }

    public Page<Product> findAllProducts(Integer pageNumber){

        if(pageNumber == null )
            pageNumber = 0;

        Pageable pageable = PageRequest.of(pageNumber, 10, Sort.by("productId"));
        Page<Product> products = productRepository.findAll(pageable);

        if(products == null)
            throw new RequestedResourceNotFoundException("There is no products with corresponding category name");

        return products;

    }

    @Override
    public Set<Product> advancedSearch(
                                       String categoryOne,
                                       String categoryTwo,
                                       String categoryThree, String priceLower, String priceUpper, String unitInStock) {

        double priceL;
        double priceU;
        int units;

        if (NumberUtils.isParsable(priceLower))
            priceL = Double.parseDouble(priceLower);
        else if (priceLower == null || priceLower == "")
            priceL = 0;
        else throw new InvalidParameterException("You must enter a number!");

        if (NumberUtils.isParsable(priceUpper))
            priceU = Double.parseDouble(priceUpper);
        else if (priceUpper == null || priceUpper == "")
            priceU = productRepository.findMaxProductPrice();
        else throw new InvalidParameterException("You must enter a number!");

        if (NumberUtils.isParsable(unitInStock))
            units = Integer.parseInt(unitInStock);
        else if (unitInStock == null || unitInStock == "")
            units = 0;
        else throw new InvalidParameterException("You must enter a number");

        if (categoryOne != null) {
            if (categoryTwo != null) {
                if (categoryThree != null) {
                    return
                           productRepository.searchByThreeCategories(categoryOne, categoryTwo, categoryThree, priceL, priceU, units);
                } else {
                    return
                    productRepository.searchByTwoCategories(categoryOne, categoryTwo, priceL, priceU, units);
                }
            } else {
                return productRepository.searchByCategory(categoryOne, priceL, priceU, units);
            }
        }
        return productRepository.search(priceL,priceU,units);

    }


    @Override
    public Product findById(Long id) {

        Optional<Product> productOptional = productRepository.findById(id);
        if(!productOptional.isPresent()){
            throw new RequestedResourceNotFoundException("Product not found");
        }
        return productOptional.get();
    }

    @Override
    public Product addProduct(Product product, BindingResult result) {

        Map errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) throw new ValidationException(errorMap);

        try{
           return productRepository.save(product);
        }catch(Exception ex){
            throw new ValueAlreadyExistsException("Product "+product.getProductName()+" already exists!");
        }
    }

    @Override
    public void deleteProduct(Long productId) {

        Product product = productRepository.getByProductId(productId);
        if(product == null)
            throw new RequestedResourceNotFoundException("Product not found");

        productRepository.delete(product);
    }

    @Override
    public Product editProduct(Product newProduct , Long id,BindingResult result) {

        Map errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) throw new ValidationException(errorMap);

        Optional<Product> productOptional = productRepository.findById(id);

        if(productOptional.isPresent()) {
                productOptional.map(product -> {
                if (!product.getProductName().equals(newProduct.getProductName()))
                    product.setProductName(newProduct.getProductName());
                if (product.getUnitInStock() != newProduct.getUnitInStock())
                    product.setUnitInStock(newProduct.getUnitInStock());
                if (product.getProductPrice() != newProduct.getProductPrice())
                    product.setProductPrice(newProduct.getProductPrice());
                if (!(product.getProductDescription().equals(newProduct.getProductDescription())))
                    product.setProductDescription(newProduct.getProductDescription());
                return product;
            });
        }
        else throw new RequestedResourceNotFoundException("Product not found");

        return productRepository.save(productOptional.get());
    }

}

