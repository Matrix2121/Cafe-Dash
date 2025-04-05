package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)

class CafeteriaRepositoryTest {

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    private CafeteriaEntity savedCafeteria;

    @BeforeEach
    void setUp() {
        savedCafeteria = cafeteriaRepository.save(TestData.createTestCafeteria());
    }

    @Test
    public void CafeteriaRepository_SaveAll_ReturnSavedCafeterias() {
        assertThat(savedCafeteria).isNotNull();
        assertThat(savedCafeteria.getId()).isGreaterThan(0);
    }
}