package com.cafe.backend.service.impl;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.mapper.ProductMapper;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.OrderProductRepository;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.service.ProductService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * {@code ProductServiceImpl} is a service class that implements {@link ProductService}.
 * It interacts with {@code productRepository}, {@code cafeteriaRepository}, and {@code orderProductRepository}
 * to manage and retrieve product data using the methods provided by {@code JpaRepository}, which {@link ProductRepository} extends.
 * <p>
 * This service handles business logic for creating, retrieving, updating, and managing products associated with cafeterias and orders.
 * </p>
 *
 * @author AngelStoynov
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    /**
     * Creates a new product based on the provided {@code ProductDTO}.
     * The product is associated with a cafeteria (if provided) and is saved to the repository.
     *
     * @param productDTO the {@code ProductDTO} containing the data for the new product.
     * @return the created {@code ProductDTO} with the product details.
     * @throws BadRequestException if the product data is invalid.
     * @throws DataMappingException if the associated cafeteria is not found.
     */
    @Override
    public ProductDTO createProduct(ProductDTO productDTO) throws BadRequestException {
        CafeteriaEntity cafeteria = null;
        if (productDTO.cafeteriaId() != null) {
            cafeteria = cafeteriaRepository.findById(productDTO.cafeteriaId())
                    .orElseThrow(() -> new DataMappingException(
                            "Cafeteria with this id is not found: " + productDTO.cafeteriaId()));
        }
        ProductEntity product = ProductMapper.mapToEntity(productDTO, cafeteria);
        product.setId(null);
        product.setDeleted(false);
        ProductEntity savedProduct = productRepository.save(product);
        return ProductMapper.mapToDTO(savedProduct);
    }

    /**
     * Retrieves a product by its unique ID.
     *
     * @param productId the ID of the product to retrieve.
     * @return the {@code ProductDTO} representing the product with the given ID.
     * @throws NotFoundException if no product is found with the given ID.
     * @throws BadRequestException if the provided product ID is invalid.
     */
    @Override
    public ProductDTO getProductById(Long productId) throws NotFoundException, BadRequestException {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with this id: " + productId));
        return ProductMapper.mapToDTO(product);
    }

    /**
     * Retrieves a list of all products.
     *
     * @return a list of {@code ProductDTO} representing all products.
     * @throws NotFoundException if no products are found.
     * @throws BadRequestException if an error occurs while retrieving products.
     */
    @Override
    public List<ProductDTO> getAllProducts() throws NotFoundException, BadRequestException {
        List<ProductEntity> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found");
        }
        List<ProductDTO> results = new ArrayList<>();
        for (ProductEntity entity : products) {
            results.add(ProductMapper.mapToDTO(entity));
        }
        return results;
    }

    /**
     * Retrieves a list of all products associated with a specific cafeteria.
     *
     * @param id the ID of the cafeteria.
     * @return a list of {@code ProductDTO} representing the products from the given cafeteria.
     * @throws NotFoundException if no products are found for the given cafeteria ID.
     * @throws DataMappingException if an error occurs during data mapping.
     */
    @Override
    public List<ProductDTO> getAllProductsFromCafeteriaId(Long id) throws NotFoundException, DataMappingException {
        List<ProductEntity> products = productRepository.findByCafeteriaId(id);

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for cafeteria with ID: " + id);
        }

        List<ProductDTO> results = new ArrayList<>();
        for (ProductEntity entity : products) {
            results.add(ProductMapper.mapToDTO(entity));
        }

        return results;
    }

    /**
     * Retrieves a list of all products associated with a specific order.
     *
     * @param id the ID of the order.
     * @return a list of {@code ProductDTO} representing the products from the given order.
     * @throws NotFoundException if no products are found for the given order ID.
     * @throws DataMappingException if an error occurs during data mapping.
     */
    @Override
    public List<ProductDTO> getAllProductsFromOrderId(Long id) throws NotFoundException, DataMappingException {
        List<OrderProductEntity> orderProducts = orderProductRepository.findByOrderIdAndIsDeletedFalse(id);

        if (orderProducts.isEmpty()) {
            throw new ResourceNotFoundException("No products found for order with ID: " + id);
        }

        List<ProductEntity> products = orderProducts.stream()
                .map(OrderProductEntity::getProduct)
                .toList();

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for order with ID: " + id);
        }

        List<ProductDTO> results = new ArrayList<>();
        for (ProductEntity entity : products) {
            results.add(ProductMapper.mapToDTO(entity));
        }

        return results;
    }

    /**
     * Updates an existing product with the new data provided in {@code ProductDTO}.
     *
     * @param productId the ID of the product to update.
     * @param updatedProduct the {@code ProductDTO} containing the updated product data.
     * @return the updated {@code ProductDTO}.
     * @throws NotFoundException if no product is found with the given ID.
     * @throws BadRequestException if the updated product data is invalid.
     */
    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO updatedProduct)
            throws NotFoundException, BadRequestException {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with this id: " + productId));

        ProductEntity newUpdatedProduct = updateProductFields(product, updatedProduct);
        return ProductMapper.mapToDTO(newUpdatedProduct);
    }

    /**
     * Updates the fields of the product entity with the provided updated data.
     *
     * @param product the {@code ProductEntity} to update.
     * @param updatedProduct the {@code ProductDTO} containing the updated product data.
     * @return the updated {@code ProductEntity}.
     */
    private ProductEntity updateProductFields(ProductEntity product, ProductDTO updatedProduct) {
        product.setName(updatedProduct.name());
        product.setPrice(updatedProduct.price());
        product.setProductType(updatedProduct.productType());
        return productRepository.save(product);
    }
}
