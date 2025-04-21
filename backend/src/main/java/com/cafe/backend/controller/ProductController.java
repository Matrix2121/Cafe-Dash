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
 * to perform CRUD operations on {@link ProductDTO} objects.</p>
 *
 * <p>Supported endpoints include creation, retrieval (by ID, cafeteria, and order), and updates.</p>
 *
 * @author Angel Stoynov
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    /**
     * Injected service layer that contains business logic related to products.
     */
    @Autowired
    private ProductService productService;

    /**
     * Creates a new product based on the provided {@link ProductDTO}.
     *
     * @param productDTO The product data to be created.
     * @return The created product as a ProductDTO.
     * @throws BadRequestException if input validation fails.
     */
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) throws BadRequestException {
        return productService.createProduct(productDTO);
    }

    /**
     * Retrieves a single product by its unique identifier.
     *
     * @param id The ID of the product to retrieve.
     * @return The matching ProductDTO.
     * @throws BadRequestException if the provided ID is invalid.
     * @throws NotFoundException if no product is found with the given ID.
     */
    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ProductDTO getProductById(@PathVariable("id") Long id) throws BadRequestException, NotFoundException {
        return productService.getProductById(id);
    }

    /**
     * Retrieves all products available in the system.
     *
     * @return A list of all products as ProductDTO objects.
     * @throws BadRequestException in case of request issues.
     * @throws NotFoundException if no products are found.
     */
    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDTO> getAllProducts() throws BadRequestException, NotFoundException {
        return productService.getAllProducts();
    }

    /**
     * Retrieves all products associated with a specific cafeteria.
     *
     * @param id The ID of the cafeteria.
     * @return A list of products available in the cafeteria.
     * @throws BadRequestException if the cafeteria ID is invalid.
     * @throws NotFoundException if the cafeteria or products are not found.
     */
    @GetMapping("/cafeteria/{cafeteriaId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDTO> getAllProductsFromCafeteriaId(@PathVariable("cafeteriaId") Long id) throws BadRequestException, NotFoundException {
        return productService.getAllProductsFromCafeteriaId(id);
    }

    /**
     * Retrieves all products associated with a specific order.
     *
     * @param id The ID of the order.
     * @return A list of products linked to the specified order.
     * @throws BadRequestException if the order ID is invalid.
     * @throws NotFoundException if the order or products are not found.
     */
    @GetMapping("/order/{orderId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDTO> getAllProductsFromOrderId(@PathVariable("orderId") Long id) throws BadRequestException, NotFoundException {
        return productService.getAllProductsFromOrderId(id);
    }

    /**
     * Updates an existing product with new information.
     *
     * @param productId      The ID of the product to be updated.
     * @param updatedProduct The new product data.
     * @return The updated product as a ProductDTO.
     * @throws BadRequestException if validation fails.
     * @throws NotFoundException if the product is not found.
     */
    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ProductDTO updateProduct(@PathVariable("id") Long productId, @RequestBody ProductDTO updatedProduct) throws BadRequestException, NotFoundException {
        return productService.updateProduct(productId, updatedProduct);
    }
}