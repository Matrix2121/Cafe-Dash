package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;

import com.cafe.backend.exception.DataMappingException;

import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReviewMapper {

    private final UserRepository userRepository;
    private final CafeteriaRepository cafeteriaRepository;

    public ReviewDTO mapToDTO(ReviewEntity reviewEntity) {
        if (reviewEntity == null) return null;

        return new ReviewDTO(
                reviewEntity.getId(),
                reviewEntity.getTitle(),
                reviewEntity.getBody(),
                reviewEntity.getRating(),
                reviewEntity.getCreatedAt(),
                reviewEntity.getUser().getId(),
                reviewEntity.getCafeteria().getId()
        );
    }

    public ReviewEntity mapToEntity(ReviewDTO reviewDTO) throws DataMappingException {
        try {
            if (reviewDTO == null) return null;

            UserEntity user = userRepository.findById(reviewDTO.userId())
                    .orElseThrow(() -> new DataMappingException("User not found with ID: " + reviewDTO.userId()));

            CafeteriaEntity cafeteria = cafeteriaRepository.findById(reviewDTO.cafeteriaId())
                    .orElseThrow(() -> new DataMappingException("Cafeteria not found with ID: " + reviewDTO.cafeteriaId()));

            return ReviewEntity.builder()
                    .id(reviewDTO.id())
                    .title(reviewDTO.title())
                    .body(reviewDTO.body())
                    .rating(reviewDTO.rating())
                    .createdAt(reviewDTO.createdAt())
                    .user(user)
                    .cafeteria(cafeteria)
                    .build();

        } catch (Exception e) {
            throw new DataMappingException("Cannot map Review to entity", e);
        }
    }
}