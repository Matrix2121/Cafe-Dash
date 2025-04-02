package com.cafe.backend.controller;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * The {@code ProductController} serves as the RESTful API entry point for managing products.
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on products.</p>
 *
 * @author AngelStoynov
 */

@RestController
@RequestMapping("/api/products")

public class ProductController {
    @Autowired private ProductService productService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) throws BadRequestException {
        return productService.createProduct(productDTO);
    }

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ProductDTO getProductById(@PathVariable("id") Long id) throws BadRequestException, NotFoundException {
        return productService.getProductById(id);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDTO> getAllProducts() throws BadRequestException, NotFoundException {
        return productService.getAllProducts();
    }

    @GetMapping("/cafeteria/{cafeteriaId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDTO> getAllProductsFromCafeteriaId(@PathVariable("cafeteriaId") Long id) throws BadRequestException, NotFoundException {
        return productService.getAllProductsFromCafeteriaId(id);
    }
    
    @GetMapping("/order/{orderId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDTO> getAllProductsFromOrderId(@PathVariable("orderId") Long id) throws BadRequestException, NotFoundException {
        return productService.getAllProductsFromOrderId(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ProductDTO updateProduct(@PathVariable("id") Long productId, @RequestBody ProductDTO updatedProduct) throws BadRequestException, NotFoundException {
        return productService.updateProduct(productId, updatedProduct);
    }
}
