package com.cafe.backend.service;

import com.cafe.backend.data.TestData;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.ProductTypeEnum;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CafeteriaRepository cafeteriaRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    void testCreateProduct() throws BadRequestException {
        CafeteriaEntity cafeteria = TestData.createTestCafeteria();
        ProductDTO productDTO = ProductDTO.builder()
                .name("product")
                .price(2)
                .productType(ProductTypeEnum.DRINKS)
                .imageUrl("url")
                .cafeteriaId(1L)
                .build();

        ProductEntity product = TestData.createTestProduct(cafeteria);

        when(cafeteriaRepository.findById(1L)).thenReturn(Optional.of(cafeteria));
        when(productRepository.save(Mockito.any(ProductEntity.class))).thenReturn(product);

        ProductDTO savedProduct = productService.createProduct(productDTO);

        assertNotNull(savedProduct);
        assertEquals("product", savedProduct.name());
    }

    @Test
    void getProductById() {
    }

    @Test
    void getAllProducts() {
    }

    @Test
    void getAllProductsFromCafeteriaId() {
    }

    @Test
    void getAllProductsFromOrderId() {
    }

    @Test
    void updateProduct() {
    }
}