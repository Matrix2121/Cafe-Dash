package com.cafe.backend.repository;

import com.cafe.backend.entity.cafeteria.Cafeteria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeteriaRepository extends JpaRepository<Cafeteria, Long> {
}
