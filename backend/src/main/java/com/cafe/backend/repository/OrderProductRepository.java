package com.cafe.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cafe.backend.entity.order_product.OrderProductEntity;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProductEntity, Long> {
	List<OrderProductEntity> findAllByIsDeletedFalse();
	List<OrderProductEntity> findByOrderIdAndIsDeletedFalse(Long orderId);
}