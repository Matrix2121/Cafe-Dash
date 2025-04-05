package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)

class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private UserEntity savedUser;

    @BeforeEach
    void setUp() {
        savedUser = userRepository.save(TestData.createTestUser());
    }

    @Test
    void findByUsernameAndIsDeletedFalse() {
        assertThat(savedUser).isNotNull();
        Optional<UserEntity> result = userRepository.findByUsernameAndIsDeletedFalse(savedUser.getUsername());
        assertThat(result).isPresent();
        UserEntity foundUser = result.get();
        assertFalse(foundUser.isDeleted());
        assertEquals("active", savedUser.getUsername());
    }

    @Test
    void findAllByIsDeletedFalse() {
        UserEntity deleted = UserEntity.builder()
                .username("deleted")
                .email("email_deleted")
                .password("password")
                .roles(null)
                .orders(null)
                .reviews(null)
                .isDeleted(true)
                .build();

        userRepository.save(deleted);

        List<UserEntity> results = userRepository.findAllByIsDeletedFalse();
        assertEquals(1, results.size());
        assertEquals("active", results.get(0).getUsername());
        assertFalse(results.get(0).isDeleted());
    }
}