package com.cafe.backend.repository;

import com.cafe.backend.entity.product.ProductEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    List<ProductEntity> findByCafeteriaId(Long cafeteriaId);
}
