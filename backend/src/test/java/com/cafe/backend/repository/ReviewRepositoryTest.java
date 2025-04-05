package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class ReviewRepositoryTest {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    private CafeteriaEntity savedCafeteria;
    private UserEntity savedUser;
    private ReviewEntity savedReview;

    @BeforeEach
    void setUp() {
        savedUser = userRepository.save(TestData.createTestUser());
        savedCafeteria = cafeteriaRepository.save(TestData.createTestCafeteria());
        savedReview = reviewRepository.save(TestData.createTestReview(savedUser, savedCafeteria));
    }

    @Test
    void findByCafeteriaIdAndIsDeletedFalse() {
        assertThat(savedCafeteria).isNotNull();
        assertThat(savedUser).isNotNull();
        assertThat(savedReview).isNotNull();

        List<ReviewEntity> results = reviewRepository.findByCafeteriaIdAndIsDeletedFalse(savedCafeteria.getId());
        assertEquals(1, results.size());
        assertFalse(results.get(0).isDeleted());
        assertEquals("title", results.get(0).getTitle());
    }
}