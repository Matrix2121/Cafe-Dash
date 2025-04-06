package com.cafe.backend.repository;

import com.cafe.backend.data.TestData;
import com.cafe.backend.entity.role.RoleEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    private RoleEntity savedRole;

    @BeforeEach
    void setUp() {
        savedRole = roleRepository.save(TestData.createTestRole());
    }

    @Test
    void testFindByRoleNameAndIsDeletedFalse() {
        assertThat(savedRole).isNotNull();
        assertThat(savedRole.getId()).isGreaterThan(0);

        Optional<RoleEntity> result = roleRepository.findByRoleNameAndIsDeletedFalse("customer");
        assertThat(result).isPresent();

        assertEquals("customer", result.get().getRoleName());
        assertFalse(result.get().isDeleted());
    }
}