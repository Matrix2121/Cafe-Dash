package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

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
                    cafeteria.getPhoneNumber(),
                    cafeteria.getDeliveryStatus()
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
                    cafeteriaDTO.phoneNumber(),
                    cafeteriaDTO.cafeteriaDeliveryStatus()
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to product", e);
        }
    }
}
