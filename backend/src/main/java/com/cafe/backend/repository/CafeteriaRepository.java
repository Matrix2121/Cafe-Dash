package com.cafe.backend.repository;

import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeteriaRepository extends JpaRepository<CafeteriaEntity, Long> {
}
