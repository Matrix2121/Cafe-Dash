package com.cafe.backend.service;

import com.cafe.backend.data.TestData;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.mapper.ProductMapper;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.ProductTypeEnum;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.OrderProductRepository;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CafeteriaRepository cafeteriaRepository;

    @Mock
    private OrderProductRepository orderProductRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private final CafeteriaEntity cafeteria = TestData.createTestCafeteria();
    private final ProductEntity product = TestData.createTestProduct(cafeteria);

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
    void testGetProductById() throws NotFoundException, BadRequestException {
        Long id = 1L;
        when(productRepository.findById(id)).thenReturn(Optional.ofNullable(product));
        ProductDTO result = productService.getProductById(id);
        assertNotNull(result);
        verify(productRepository).findById(id);
    }

    @Test
    void testGetAllProducts() throws NotFoundException, BadRequestException {
        ProductEntity productEntity = ProductEntity.builder()
                .name("product 1")
                .price(20)
                .productType(ProductTypeEnum.DRINKS)
                .cafeteria(cafeteria)
                .imageUrl("url")
                .isDeleted(false)
                .build();

        ProductEntity productEntity2 = ProductEntity.builder()
                .name("product 2")
                .price(20)
                .productType(ProductTypeEnum.DRINKS)
                .cafeteria(cafeteria)
                .imageUrl("url2")
                .isDeleted(false)
                .build();

        List<ProductEntity> productEntities = List.of(productEntity, productEntity2);
        when(productRepository.findAll()).thenReturn(productEntities);

        try (MockedStatic<ProductMapper> mockedMapper = Mockito.mockStatic(ProductMapper.class)) {
            mockedMapper.when(() -> ProductMapper.mapToDTO(productEntity)).thenReturn(ProductDTO.builder().name("product 1").build());
            mockedMapper.when(() -> ProductMapper.mapToDTO(productEntity2)).thenReturn(ProductDTO.builder().name("product 2").build());
            List<ProductDTO> result = productService.getAllProducts();

            assertNotNull(result);
            assertEquals(2, result.size());
            assertEquals("product 1", result.get(0).name());
            assertEquals("product 2", result.get(1).name());
        }
    }

    @Test
    void testGetAllProductsFromCafeteriaId() throws NotFoundException, DataMappingException {
        when(productRepository.findByCafeteriaId(1L)).thenReturn(List.of(product));
        try (MockedStatic<ProductMapper> mockedMapper = Mockito.mockStatic(ProductMapper.class)) {
            mockedMapper.when(() -> ProductMapper.mapToDTO(product))
                    .thenReturn(ProductDTO.builder()
                            .name("product")
                            .price(product.getPrice())
                            .productType(product.getProductType())
                            .imageUrl(product.getImageUrl())
                            .cafeteriaId(product.getCafeteria().getId())
                            .build());

            List<ProductDTO> productDTOs = productService.getAllProductsFromCafeteriaId(1L);

            assertNotNull(productDTOs);
            assertEquals(1, productDTOs.size());
            assertEquals("product", productDTOs.get(0).name());
        }
    }

    @Test
    void testGetAllProductsFromCafeteriaId_NotFound() throws NotFoundException {
        List<ProductEntity> entities = new ArrayList<>();
        when(productRepository.findByCafeteriaId(1L)).thenReturn(entities);
        assertThrows(ResourceNotFoundException.class, () -> {
           productService.getAllProductsFromCafeteriaId(1L);
        });
    }

    @Test
    void getAllProductsFromOrderId() throws NotFoundException, BadRequestException {
        Long orderId = 1L;

        ProductEntity product1 = Mockito.mock(ProductEntity.class);
        ProductEntity product2 = Mockito.mock(ProductEntity.class);

        OrderProductEntity orderProduct1 = Mockito.mock(OrderProductEntity.class);
        OrderProductEntity orderProduct2 = Mockito.mock(OrderProductEntity.class);

        when(orderProduct1.getProduct()).thenReturn(product1);
        when(orderProduct2.getProduct()).thenReturn(product2);

        List<OrderProductEntity> orderProducts = List.of(orderProduct1, orderProduct2);

        when(orderProductRepository.findByOrderIdAndIsDeletedFalse(orderId)).thenReturn(orderProducts);

        try (MockedStatic<ProductMapper> mockedMapper = Mockito.mockStatic(ProductMapper.class)) {
            mockedMapper.when(() -> ProductMapper.mapToDTO(product1))
                    .thenReturn(ProductDTO.builder().name("product 1").build());
            mockedMapper.when(() -> ProductMapper.mapToDTO(product2))
                    .thenReturn(ProductDTO.builder().name("product 2").build());

            List<ProductDTO> result = productService.getAllProductsFromOrderId(orderId);

            assertNotNull(result);
            assertEquals(2, result.size());
            assertEquals("product 1", result.get(0).name());
            assertEquals("product 2", result.get(1).name());
        }
    }

    @Test
    void updateProduct() throws NotFoundException, BadRequestException {
        Long id = 1L;
        ProductDTO productDTO = ProductDTO.builder()
                .name("product")
                .price(2)
                .productType(ProductTypeEnum.DRINKS)
                .imageUrl("url")
                .cafeteriaId(1L)
                .build();

        when(productRepository.findById(id)).thenReturn(Optional.ofNullable(product));
        when(productRepository.save(Mockito.any(ProductEntity.class))).thenReturn(product);
        ProductDTO savedProduct = productService.updateProduct(id, productDTO);
        assertNotNull(savedProduct);
    }
}