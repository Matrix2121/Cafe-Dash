package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.order.OrderEntity;
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
class OrderRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    private ProductEntity savedProduct;
    private CafeteriaEntity savedCafeteria;
    private UserEntity savedUser;
    private OrderEntity savedOrder;

    @BeforeEach
    void setUp() {
        savedUser = userRepository.save(TestData.createTestUser());
        savedCafeteria = cafeteriaRepository.save(TestData.createTestCafeteria());
        savedOrder = orderRepository.save(TestData.createTestOrder(savedUser, savedCafeteria, new ArrayList<>()));
        savedProduct = productRepository.save(TestData.createTestProduct(savedCafeteria));
    }

    @Test
    void testFindAllByIsDeletedFalse() {
        assertThat(savedOrder).isNotNull();
        List<OrderEntity> results = orderRepository.findAllByIsDeletedFalse();
        assertThat(results).isNotNull();
        assertFalse(results.get(0).isDeleted());
        assertEquals(1, results.size());
    }

    @Test
    void testFindByIdAndIsDeletedFalse() {
        assertThat(savedOrder).isNotNull();

        List<OrderEntity> results = orderRepository.findByIdAndIsDeletedFalse(1L);
        assertThat(results).isNotNull();
        assertFalse(results.get(0).isDeleted());

        assertEquals(savedOrder.getId(), results.get(0).getId());
        assertEquals(1, results.size());
    }

    @Test
    void testFindByUserIdAndIsDeletedFalse() {
        assertThat(savedOrder).isNotNull();
        assertThat(savedUser).isNotNull();

        List<OrderEntity> results = orderRepository.findByIdAndIsDeletedFalse(savedUser.getId());
        assertThat(results).isNotNull();

        assertFalse(results.get(0).isDeleted());
        assertNotNull(savedUser.getId());
        assertEquals(1, results.size());
        assertEquals(savedUser.getId(), savedOrder.getUser().getId());
    }
}