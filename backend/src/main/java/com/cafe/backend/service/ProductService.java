package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code ProductService} is an interface that defines basic CRUD methods.
 * @author AngelStoynov
 */
public interface ProductService {
	ProductDTO createProduct(ProductDTO productDTO) throws BadRequestException;
	ProductDTO getProductById(Long productId) throws NotFoundException, BadRequestException;
	List<ProductDTO> getAllProducts() throws NotFoundException, BadRequestException;
	List<ProductDTO> getAllProductsFromCafeteriaId(Long id) throws NotFoundException, DataMappingException;
	List<ProductDTO> getAllProductsFromOrderId(Long id) throws NotFoundException, DataMappingException;
	ProductDTO updateProduct(Long productId, ProductDTO updatedProduct) throws NotFoundException, BadRequestException;
}
