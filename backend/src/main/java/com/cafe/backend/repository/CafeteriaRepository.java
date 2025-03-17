package com.cafe.backend.repository;

import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CafeteriaRepository extends JpaRepository<CafeteriaEntity, Long> {
	List<ProductEntity> findAllProductsByName(String name);
}
