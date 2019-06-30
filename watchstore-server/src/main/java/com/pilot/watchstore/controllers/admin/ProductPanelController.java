package com.pilot.watchstore.controllers.admin;

import com.pilot.watchstore.model.Product;
import com.pilot.watchstore.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/admin/productmanagement")
@CrossOrigin
public class ProductPanelController {

    private ProductService productService;

    public ProductPanelController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/addproduct")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public Product addProduct(@Valid @RequestBody Product product, BindingResult result){
        return productService.addProduct(product,result);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteProduct(@PathVariable("id") Long id){
         productService.deleteProduct(id);
    }

    @PutMapping("/edit/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Product editProduct(@RequestBody Product product,@PathVariable("id") Long id,BindingResult result){
        return productService.editProduct(product,id,result);
    }

}
