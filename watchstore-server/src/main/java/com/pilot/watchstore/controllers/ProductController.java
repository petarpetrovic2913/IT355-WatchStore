package com.pilot.watchstore.controllers;


import com.pilot.watchstore.model.Category;
import com.pilot.watchstore.model.Product;
import com.pilot.watchstore.services.CategoryService;
import com.pilot.watchstore.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@RequestMapping(path="/products",produces = "application/json")
@CrossOrigin(origins="*")
public class ProductController {


    private ProductService productService;
    private CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<Product> getPageableProducts(@RequestParam(name="pagenum",required = false) Integer pageNumber){
        return productService.findAllProducts(pageNumber);
    }

    @GetMapping(value="/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Product getProductById(@PathVariable("id") Long id){
        return productService.findById(id);
    }

    @GetMapping(value ="/category/{name}")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<Product> getProductsByCategoryName(@PathVariable(name="name") String categoryName , @RequestParam(name="pageNum",required = false) Integer pageNum){
        return productService.findAllProductsByCategoryName(categoryName,pageNum);
    }

    @GetMapping("/search")
    @ResponseStatus(value = HttpStatus.OK)
    public Set<Product> advancedSearch(
                                        @RequestParam(name="categoryOne",required = false) String categoryOne,
                                        @RequestParam(name="categoryTwo",required = false) String categoryTwo,
                                                       @RequestParam(name="categoryThree",required = false) String categoryThree,
                                                       @RequestParam(name="priceFrom",required = false) String priceFrom,
                                                       @RequestParam(name="priceLimit",required = false) String priceLimit,
                                                       @RequestParam(name="unitInStock",required = false) String unitInStock) {

        return productService.advancedSearch(categoryOne,categoryTwo,categoryThree,priceFrom,priceLimit,unitInStock);

    }

    @GetMapping("/allproducts")
    @ResponseStatus(value = HttpStatus.OK)
    public Iterable<Product> getAllProducts(){
        return productService.findAll();
    }

    @GetMapping("/categories")
    @ResponseStatus(value = HttpStatus.OK)
    public Set<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/categories/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Category getAllCategories(@PathVariable("id") Long categoryId){
        return categoryService.getByCategoryId(categoryId);
    }

}
