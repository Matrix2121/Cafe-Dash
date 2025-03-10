package com.cafe.backend.service.impl;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.mapper.CafeteriaMapper;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.service.CafeteriaService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * {@code CafeteriaServiceImpl} is class that implements {@link CafeteriaService}.
 * It uses {@code cafeteriaRepository} to save/find the necessary data by the provided methods by {@code JpaRepository} which {@link CafeteriaRepository} extends.
 * @author AngelStoynov
 */
@Service
@Transactional
public class CafeteriaServiceImpl implements CafeteriaService {

    @Autowired private CafeteriaRepository cafeteriaRepository;

    @Override
    public CafeteriaDTO getCafeteriaById(Long id)  throws NotFoundException, BadRequestException {
        CafeteriaEntity cafeteria = cafeteriaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not find cafeteria with this id: " + id));
        return CafeteriaMapper.mapToCafeteriaDTO(cafeteria);
    }

    @Override
    public List<CafeteriaDTO> getAllCafeterias() throws NotFoundException, BadRequestException {
        List<CafeteriaEntity> cafeterias = cafeteriaRepository.findAll();

        if(cafeterias.isEmpty()) {
            throw new ResourceNotFoundException("No cafeterias found");
        }

        List<CafeteriaDTO> results = new ArrayList<>();
        for (CafeteriaEntity entity: cafeterias) {
            results.add(CafeteriaMapper.mapToCafeteriaDTO(entity));
        }
        return results;
    }

    @Override
    public CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO) throws BadRequestException {
        CafeteriaEntity cafeteria = CafeteriaMapper.mapToCafeteria(cafeteriaDTO);
        if (cafeteria.getProducts() == null) {
            cafeteria.setProducts(new HashSet<>());
        }
        CafeteriaEntity savedCafeteria = cafeteriaRepository.save(cafeteria);
        return CafeteriaMapper.mapToCafeteriaDTO(savedCafeteria);
    }
}
