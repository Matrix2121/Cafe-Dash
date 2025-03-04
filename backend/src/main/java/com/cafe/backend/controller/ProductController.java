package com.cafe.backend.controller;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO savedProduct = productService.createProduct(productDTO);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") Long id) {
        ProductDTO productDTO = productService.getProductById(id);
        return ResponseEntity.ok(productDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") Long productId, @RequestBody ProductDTO updatedProduct) {
        ProductDTO product = productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok(product);
    }
}
