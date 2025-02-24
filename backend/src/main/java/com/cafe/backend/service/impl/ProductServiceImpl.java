package com.cafe.backend.service.impl;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.mapper.ProductMapper;
import com.cafe.backend.entity.product.Product;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.service.ProductService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * {@code ProductServiceImpl} is class that implements {@link ProductService}.
 * It uses {@code productRepository} to save/find the necessary data by the provided methods by {@code JpaRepository} which {@link ProductRepository} extends.
 * @author AngelStoynov
 */
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = ProductMapper.mapToProduct(productDTO);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDTO(savedProduct);
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + productId));
        return ProductMapper.mapToProductDTO(product);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(ProductMapper::mapToProductDTO).collect(Collectors.toList());
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO updatedProduct) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + productId));

        Product newUpdatedProduct = updateProductFields(product, updatedProduct);
        return ProductMapper.mapToProductDTO(newUpdatedProduct);
    }

    private Product updateProductFields(Product product, ProductDTO updatedProduct) {
        product.setName(updatedProduct.name());
        product.setPrice(updatedProduct.price());
        product.setQuantity(updatedProduct.quantity());
        product.setProductType(updatedProduct.productType());
        return productRepository.save(product);
    }
}
