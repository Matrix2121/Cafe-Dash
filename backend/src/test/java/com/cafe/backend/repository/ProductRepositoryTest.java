package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.ProductTypeEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    private CafeteriaEntity savedCafeteria;
    private ProductEntity savedProduct;

    @BeforeEach
    void setUp() {
        savedCafeteria = cafeteriaRepository.save(TestData.createTestCafeteria());
        savedProduct = productRepository.save(TestData.createTestProduct(savedCafeteria));
    }

    @Test
    void testFindByCafeteriaId() {
        assertThat(savedCafeteria).isNotNull();
        assertThat(savedCafeteria.getId()).isGreaterThan(0);
        assertThat(savedProduct).isNotNull();
        assertThat(savedProduct.getId()).isGreaterThan(0);

        List<ProductEntity> results = productRepository.findByCafeteriaId(savedCafeteria.getId());
        assertEquals(1, results.size());
        assertFalse(results.isEmpty(), "Expected at least one product");
        assertEquals(savedProduct.getName(), results.get(0).getName());
        assertEquals(ProductTypeEnum.DRINKS, results.get(0).getProductType());
    }
}