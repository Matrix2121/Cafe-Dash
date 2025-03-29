package com.cafe.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cafe.backend.entity.order.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	List<OrderEntity> findAllByIsDeletedFalse();
	List<OrderEntity> findByIdAndIsDeletedFalse(Long id);
	List<OrderEntity> findByUserIdAndIsDeletedFalse(Long id);
}
