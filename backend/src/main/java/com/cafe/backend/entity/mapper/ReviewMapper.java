package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * {@code ReviewMapper} is a utility class used for mapping between {@code ReviewEntity} and {@code ReviewDTO}.
 * This class provides methods to convert a {@code ReviewEntity} to a {@code ReviewDTO} and vice versa.
 * <p>
 * The methods in this class will throw a {@link DataMappingException} if the input is {@code null}.
 * </p>
 *
 * @author VasilStoykov
 */
public class ReviewMapper {

    /**
     * Maps a {@code ReviewEntity} to a {@code ReviewDTO}.
     *
     * @param reviewEntity the {@code ReviewEntity} to map.
     * @return a {@code ReviewDTO} representing the given entity.
     * @throws DataMappingException if the input {@code reviewEntity} is {@code null}.
     */
    public static ReviewDTO mapToDTO(ReviewEntity reviewEntity) throws DataMappingException {
        if (reviewEntity == null) {
            throw new DataMappingException("ReviewEntity cannot be null");
        }
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

    /**
     * Maps a {@code ReviewDTO} to a {@code ReviewEntity}.
     *
     * @param reviewDTO the {@code ReviewDTO} to map.
     * @return a {@code ReviewEntity} representing the given DTO.
     * @throws DataMappingException if the input {@code reviewDTO} is {@code null}.
     */
    public static ReviewEntity mapToEntity(ReviewDTO reviewDTO) throws DataMappingException {
        if (reviewDTO == null) {
            throw new DataMappingException("ReviewDTO cannot be null");
        }

        UserEntity user = new UserEntity();
        user.setId(reviewDTO.userId());

        CafeteriaEntity cafeteria = new CafeteriaEntity();
        cafeteria.setId(reviewDTO.cafeteriaId());

        return ReviewEntity.builder()
                .id(reviewDTO.id())
                .title(reviewDTO.title())
                .body(reviewDTO.body())
                .rating(reviewDTO.rating())
                .createdAt(reviewDTO.createdAt())
                .user(user)
                .cafeteria(cafeteria)
                .build();
    }
}