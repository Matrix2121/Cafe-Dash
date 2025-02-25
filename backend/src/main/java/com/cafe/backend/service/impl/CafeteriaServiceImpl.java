package com.cafe.backend.service.impl;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.Cafeteria;
import com.cafe.backend.entity.mapper.CafeteriaMapper;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.service.CafeteriaService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

/**
 * {@code CafeteriaServiceImpl} is class that implements {@link CafeteriaService}.
 * It uses {@code cafeteriaRepository} to save/find the necessary data by the provided methods by {@code JpaRepository} which {@link CafeteriaRepository} extends.
 * @author AngelStoynov
 */
@Service

public class CafeteriaServiceImpl implements CafeteriaService {
    private final CafeteriaRepository cafeteriaRepository;

    public CafeteriaServiceImpl(CafeteriaRepository cafeteriaRepository) {
        this.cafeteriaRepository = cafeteriaRepository;
    }

    @Override
    public CafeteriaDTO getCafeteriaById(Long id) {
        Cafeteria cafeteria = cafeteriaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Could not find cafeteria with this id: " + id));
        return CafeteriaMapper.mapToCafeteriaDTO(cafeteria);
    }

    @Override
    public List<CafeteriaDTO> getAllCafeterias() {
        List<Cafeteria> cafeterias = cafeteriaRepository.findAll();
        return cafeterias.stream().map(CafeteriaMapper::mapToCafeteriaDTO).toList();
    }

    @Override
    public CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO) {
        Cafeteria cafeteria = CafeteriaMapper.mapToCafeteriaBulgaria(cafeteriaDTO);
        if (cafeteria.getProducts() == null) {
            cafeteria.setProducts(new HashSet<>());
        }
        Cafeteria savedCafeteria = cafeteriaRepository.save(cafeteria);
        return CafeteriaMapper.mapToCafeteriaDTO(savedCafeteria);
    }
}
