package com.cafe.backend.service;

import com.cafe.backend.dto.ProductDTO;
import java.util.List;

/**
 * {@code ProductService} is an interface that defines basic CRUD methods.
 * @author AngelStoynov
 */
public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO getProductById(Long productId);
    List<ProductDTO> getAllProducts();
    ProductDTO updateProduct(Long productId, ProductDTO updatedProduct);
}
