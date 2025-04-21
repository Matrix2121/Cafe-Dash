package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * {@code CafeteriaMapper} is a utility class used for mapping between {@code CafeteriaEntity} and {@code CafeteriaDTO}.
 * This class contains methods to convert a {@code CafeteriaEntity} to a {@code CafeteriaDTO} and vice versa.
 * It is designed to handle the transformation between entity and DTO representations for the cafeteria data.
 * <p>
 * The methods in this class will throw a {@link DataMappingException} if the input is {@code null}.
 * </p>
 *
 * @author AngelStoynov, ZapryanZapryanov
 */
public class CafeteriaMapper {

    /**
     * Private constructor to prevent instantiation of this utility class.
     */
    private CafeteriaMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    /**
     * Maps a {@code CafeteriaEntity} to a {@code CafeteriaDTO}.
     *
     * @param cafeteria the {@code CafeteriaEntity} to map.
     * @return a {@code CafeteriaDTO} representing the given entity.
     * @throws DataMappingException if the input {@code cafeteria} is {@code null}.
     */
    public static CafeteriaDTO mapToDTO(CafeteriaEntity cafeteria) throws DataMappingException {
        if (cafeteria == null) {
            throw new DataMappingException("Cafeteria cannot be null");
        }
        return new CafeteriaDTO(
                cafeteria.getId(),
                cafeteria.getName(),
                cafeteria.getBrand(),
                cafeteria.getLocation(),
                cafeteria.getRating(),
                cafeteria.getCountReview(),
                cafeteria.getPhoneNumber(),
                cafeteria.getOpeningHour(),
                cafeteria.getClosingHour(),
                cafeteria.getImageUrl()
        );
    }

    /**
     * Maps a {@code CafeteriaDTO} to a {@code CafeteriaEntity}.
     *
     * @param cafeteriaDTO the {@code CafeteriaDTO} to map.
     * @return a {@code CafeteriaEntity} representing the given DTO.
     * @throws DataMappingException if the input {@code cafeteriaDTO} is {@code null}.
     */
    public static CafeteriaEntity mapToEntity(CafeteriaDTO cafeteriaDTO) throws DataMappingException {
        if (cafeteriaDTO == null) {
            throw new DataMappingException("CafeteriaDTO cannot be null");
        }
        return CafeteriaEntity.builder()
                .id(cafeteriaDTO.id())
                .name(cafeteriaDTO.name())
                .brand(cafeteriaDTO.brand())
                .location(cafeteriaDTO.location())
                .rating(cafeteriaDTO.rating())
                .countReview(cafeteriaDTO.countReview())
                .phoneNumber(cafeteriaDTO.phoneNumber())
                .openingHour(cafeteriaDTO.openingHour())
                .closingHour(cafeteriaDTO.closingHour())
                .imageUrl(cafeteriaDTO.imageUrl())
                .build();
    }
}