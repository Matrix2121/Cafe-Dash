package com.cafe.backend.service.impl;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.mapper.ProductMapper;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.service.ProductService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * {@code ProductServiceImpl} is class that implements {@link ProductService}.
 * It uses {@code productRepository} to save/find the necessary data by the provided methods by {@code JpaRepository} which {@link ProductRepository} extends.
 * @author AngelStoynov
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired private ProductRepository productRepository;
    @Autowired private CafeteriaRepository cafeteriaRepository;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) throws BadRequestException {
        CafeteriaEntity cafeteria = null;
        if (productDTO.cafeteriaId() != null) {
            cafeteria = cafeteriaRepository.findById(productDTO.cafeteriaId())
                    .orElseThrow(() -> new DataMappingException("Cafeteria with this id is not found: " + productDTO.cafeteriaId()));
            
        }
        ProductEntity product = ProductMapper.toEntity(productDTO, cafeteria);
        product.setId(null);
        product.setDeleted(false);
        ProductEntity savedProduct = productRepository.save(product);
        return ProductMapper.toDTO(savedProduct);
    }

    @Override
    public ProductDTO getProductById(Long productId) throws NotFoundException, BadRequestException {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + productId));
        return ProductMapper.toDTO(product);
    }

    @Override
    public List<ProductDTO> getAllProducts() throws NotFoundException, BadRequestException {
        List<ProductEntity> products = productRepository.findAll();
        if(products.isEmpty()) {
        	throw new ResourceNotFoundException("No products found");
        }
        List<ProductDTO> results = new ArrayList<ProductDTO>();
        for(ProductEntity entity : products) {
        	results.add(ProductMapper.toDTO(entity));
        }
        return results; 
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO updatedProduct) throws NotFoundException, BadRequestException {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + productId));

        ProductEntity newUpdatedProduct = updateProductFields(product, updatedProduct);
        return ProductMapper.toDTO(newUpdatedProduct);
    }

    private ProductEntity updateProductFields(ProductEntity product, ProductDTO updatedProduct) {
        product.setName(updatedProduct.name());
        product.setPrice(updatedProduct.price());
        product.setProductType(updatedProduct.productType());
        return productRepository.save(product);
    }
}
