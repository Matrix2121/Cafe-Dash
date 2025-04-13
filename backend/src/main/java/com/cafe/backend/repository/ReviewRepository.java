package com.cafe.backend.repository;

import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findByCafeteriaIdAndIsDeletedFalse(Long cafeteriaId);
    List<ReviewEntity> findByUserIdAndIsDeletedFalse(Long userId) throws BadRequestException, NotFoundException;
}
