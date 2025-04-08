package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * @author AngelStoynov, ZapryanZapryanov
 */

public class CafeteriaMapper {

    private CafeteriaMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

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
