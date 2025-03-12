package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.exception.DataMappingException;

public class CafeteriaMapper {

    private CafeteriaMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static CafeteriaDTO mapToCafeteriaDTO(CafeteriaEntity cafeteria) throws DataMappingException {
        if (cafeteria == null) {
            throw new DataMappingException("Cafeteria cannot be null");
        }

        try {
            return new CafeteriaDTO(
                    cafeteria.getId(),
                    cafeteria.getName(),
                    cafeteria.getBrand(),
                    cafeteria.getLocation(),
                    cafeteria.getRating(),
                    cafeteria.getCountReview(),
                    cafeteria.getPhoneNumber()
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to cafeteriaDTO", e);
        }
    }

    public static CafeteriaEntity mapToCafeteria(CafeteriaDTO cafeteriaDTO) throws DataMappingException {
        try {
            return new CafeteriaEntity(
                    cafeteriaDTO.id(),
                    cafeteriaDTO.name(),
                    cafeteriaDTO.brand(),
                    cafeteriaDTO.location(),
                    cafeteriaDTO.rating(),
                    cafeteriaDTO.countReview(),
                    cafeteriaDTO.phoneNumber()
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to cafeteriaEntity", e);
        }
    }
}
