package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.entity.product.ProductEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class OrderProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    private ProductEntity savedProduct;
    private CafeteriaEntity savedCafeteria;
    private UserEntity savedUser;
    private OrderEntity savedOrder;
    private OrderProductEntity savedOrderProduct;

    @BeforeEach
    void setUp() {
        savedUser = userRepository.save(TestData.createTestUser());
        savedCafeteria = cafeteriaRepository.save(TestData.createTestCafeteria());
        savedOrder = orderRepository.save(TestData.createTestOrder(savedUser, savedCafeteria, new ArrayList<>()));
        savedProduct = productRepository.save(TestData.createTestProduct(savedCafeteria));
        savedOrderProduct = orderProductRepository.save(TestData.createTestOrderProduct(savedProduct, savedOrder));
    }

    @Test
    void testFindAllByIsDeletedFalse() {
        assertThat(savedOrderProduct).isNotNull();
        assertThat(savedOrderProduct.getId()).isGreaterThan(0);

        List<OrderProductEntity> result = orderProductRepository.findAllByIsDeletedFalse();
        assertThat(result).isNotNull();
        assertEquals(1, result.size());

        assertFalse(result.get(0).isDeleted());
        assertEquals(savedOrderProduct.getId(), result.get(0).getId());
    }

    @Test
    void testFindByOrderIdAndIsDeletedFalse() {
        assertThat(savedOrderProduct).isNotNull();
        assertThat(savedOrderProduct.getId()).isGreaterThan(0);

        assertThat(savedOrder).isNotNull();
        assertThat(savedOrder.getId()).isGreaterThan(0);

        List<OrderProductEntity> result = orderProductRepository.findByOrderIdAndIsDeletedFalse(savedOrder.getId());
        assertThat(result).isNotNull();
        assertEquals(1, result.size());

        assertFalse(result.get(0).isDeleted());
        assertEquals(savedOrderProduct.getId(), result.get(0).getId());
    }
}