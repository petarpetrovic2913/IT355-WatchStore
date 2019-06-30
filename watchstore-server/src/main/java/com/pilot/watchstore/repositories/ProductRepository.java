package com.pilot.watchstore.repositories;

import com.pilot.watchstore.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {

    Page<Product> findAll(Pageable pageable);

    @Query("Select p From Product p JOIN p.categories c WHERE c.categoryName LIKE ?1")
    Page<Product> getByCategoryName(String categoryName,Pageable pageable);

    Product getByProductId(Long id);

    @Query("Select max(p.productPrice) from Product p")
    double findMaxProductPrice();

    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.categoryName LIKE ?1 AND p.productPrice BETWEEN ?2 and ?3 AND p.unitInStock >= ?4")
    Set<Product> searchByCategory(String categoryName,double priceLower,double priceUpper,int unitInStock);

    @Query("SELECT p FROM Product p JOIN p.categories c1 JOIN p.categories c2 WHERE c1.categoryName = ?1 AND c2.categoryName = ?2 AND p.productPrice BETWEEN ?3 and ?4 AND p.unitInStock >= ?5")
    Set<Product> searchByTwoCategories(String categoryOne,String categoryTwo,double priceLower,double priceUpper,int unitInStock);

    @Query("SELECT p FROM Product p JOIN p.categories c1 JOIN p.categories c2 JOIN p.categories c3 WHERE c1.categoryName = ?1 AND c2.categoryName = ?2 AND c3.categoryName = ?3 AND p.productPrice BETWEEN ?4 and ?5 AND p.unitInStock >= ?6")
    Set<Product> searchByThreeCategories(String categoryOne,String categoryTwo,String categoryThree,double priceLower,double priceUpper,int unitInStock);

    @Query("SELECT p FROM Product p WHERE p.productPrice BETWEEN ?1 and ?2 and p.unitInStock >= ?3")
    Set<Product> search(double priceLower,double priceUpper,int UnitInStock);

}
