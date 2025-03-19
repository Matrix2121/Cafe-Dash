package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ReviewDTO;

import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;

import com.cafe.backend.exception.DataMappingException;

/**
 * @author VasilStoykov
 */

public class ReviewMapper {

    public static ReviewDTO mapToDTO(ReviewEntity reveiwEntity) {
        if (reveiwEntity == null)
            return null;

        return new ReviewDTO(
                reveiwEntity.getId(),
                reveiwEntity.getTitle(),
                reveiwEntity.getBody(),
                reveiwEntity.getRating(),
                reveiwEntity.getCreatedAt(),
                reveiwEntity.getUser().getId(),
                reveiwEntity.getCafeteria().getId());
    }

    public static ReviewEntity mapToEntity(ReviewDTO reviewDTO, UserEntity user, CafeteriaEntity cafeteria)
            throws DataMappingException {
        try {
            if (reviewDTO == null)
                return null;

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
            throw new DataMappingException("Cannot map Review to entity.", e);
        }
    }
}
