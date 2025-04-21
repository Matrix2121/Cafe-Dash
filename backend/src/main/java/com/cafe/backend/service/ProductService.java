package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code ProductService} is an interface that defines methods for managing products.
 * These methods include creating, retrieving, updating products, and querying products based on various criteria.
 * <p>
 * The methods in this interface throw {@code BadRequestException} and {@code NotFoundException} when the input is invalid
 * or when the requested product data is not found.
 * </p>
 *
 * @author AngelStoynov
 */
public interface ProductService {

	/**
	 * Creates a new product based on the provided product data.
	 *
	 * @param productDTO the {@code ProductDTO} containing the data for the new product.
	 * @return the created {@code ProductDTO} with the product details.
	 * @throws BadRequestException if the provided product data is invalid.
	 */
	ProductDTO createProduct(ProductDTO productDTO) throws BadRequestException;

	/**
	 * Retrieves a product by its unique ID.
	 *
	 * @param productId the ID of the product to retrieve.
	 * @return the {@code ProductDTO} representing the product with the given ID.
	 * @throws NotFoundException if no product is found with the given ID.
	 * @throws BadRequestException if the provided ID is invalid.
	 */
	ProductDTO getProductById(Long productId) throws NotFoundException, BadRequestException;

	/**
	 * Retrieves a list of all products.
	 *
	 * @return a list of {@code ProductDTO} representing all products.
	 * @throws NotFoundException if no products are found.
	 * @throws BadRequestException if an error occurs while retrieving products.
	 */
	List<ProductDTO> getAllProducts() throws NotFoundException, BadRequestException;

	/**
	 * Retrieves a list of all products from a specific cafeteria by its ID.
	 *
	 * @param id the ID of the cafeteria.
	 * @return a list of {@code ProductDTO} representing the products from the given cafeteria.
	 * @throws NotFoundException if no products are found for the given cafeteria.
	 * @throws DataMappingException if an error occurs during data mapping.
	 */
	List<ProductDTO> getAllProductsFromCafeteriaId(Long id) throws NotFoundException, DataMappingException;

	/**
	 * Retrieves a list of all products associated with a specific order by its ID.
	 *
	 * @param id the ID of the order.
	 * @return a list of {@code ProductDTO} representing the products from the given order.
	 * @throws NotFoundException if no products are found for the given order.
	 * @throws DataMappingException if an error occurs during data mapping.
	 */
	List<ProductDTO> getAllProductsFromOrderId(Long id) throws NotFoundException, DataMappingException;

	/**
	 * Updates an existing product with new data.
	 *
	 * @param productId the ID of the product to update.
	 * @param updatedProduct the {@code ProductDTO} containing the updated product data.
	 * @return the updated {@code ProductDTO}.
	 * @throws NotFoundException if no product is found with the given ID.
	 * @throws BadRequestException if the updated product data is invalid.
	 */
	ProductDTO updateProduct(Long productId, ProductDTO updatedProduct) throws NotFoundException, BadRequestException;
}
