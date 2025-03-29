package com.cafe.backend.service.impl;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;

import com.cafe.backend.entity.mapper.CafeteriaMapper;
import com.cafe.backend.entity.mapper.ProductMapper;

import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;

import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.service.CafeteriaService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * {@code CafeteriaServiceImpl} is class that implements
 * {@link CafeteriaService}.
 * It uses {@code cafeteriaRepository} to save/find the necessary data by the
 * provided methods by {@code JpaRepository} which {@link CafeteriaRepository}
 * extends.
 * 
 * @author AngelStoynov
 */
@Service
@Transactional
public class CafeteriaServiceImpl implements CafeteriaService {

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO) throws BadRequestException {
        CafeteriaEntity cafeteria = CafeteriaMapper.mapToEntity(cafeteriaDTO);
        cafeteria.setId(null);
        CafeteriaEntity savedCafeteria = cafeteriaRepository.save(cafeteria);
        return CafeteriaMapper.mapToDTO(savedCafeteria);
    }

    @Override
    public CafeteriaDTO getCafeteriaById(Long id) throws NotFoundException, BadRequestException {
        CafeteriaEntity cafeteria = cafeteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find cafeteria with this id: " + id));
        return CafeteriaMapper.mapToDTO(cafeteria);
    }

    @Override
    public List<CafeteriaDTO> getAllCafeterias() throws NotFoundException, BadRequestException {
        List<CafeteriaEntity> cafeterias = cafeteriaRepository.findAll();

        if (cafeterias.isEmpty()) {
            throw new ResourceNotFoundException("No cafeterias found");
        }

        List<CafeteriaDTO> results = new ArrayList<>();
        for (CafeteriaEntity entity : cafeterias) {
            results.add(CafeteriaMapper.mapToDTO(entity));
        }
        return results;
    }

    @Override
    public CafeteriaDTO updateCafeteria(Long id, CafeteriaDTO cafeteriaDTO)
            throws NotFoundException, BadRequestException {
        CafeteriaEntity cafeteria = cafeteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find cafeteria with this id:" + id));
        CafeteriaEntity newUpdatedCafeteria = updateCafeteriaFields(cafeteriaDTO, cafeteria);
        return CafeteriaMapper.mapToDTO(newUpdatedCafeteria);
    }

    private CafeteriaEntity updateCafeteriaFields(CafeteriaDTO updatedCafeteria, CafeteriaEntity cafeteria) {
        cafeteria.setName(updatedCafeteria.name());
        cafeteria.setBrand(updatedCafeteria.brand());
        cafeteria.setLocation(updatedCafeteria.location());
        cafeteria.setRating(updatedCafeteria.rating());
        cafeteria.setCountReview(updatedCafeteria.countReview());
        cafeteria.setPhoneNumber(updatedCafeteria.phoneNumber());
        cafeteria.setImageUrl(updatedCafeteria.imageUrl());
        cafeteria.setOpeningHour(updatedCafeteria.openingHour());
        cafeteria.setClosingHour(updatedCafeteria.closingHour());
        return cafeteriaRepository.save(cafeteria);
    }

    @Override
    public CafeteriaDTO updateCafeteriaReviewFields(Long cafeteriaId, Integer countReviews, Double rating) throws BadRequestException, NotFoundException {
        CafeteriaDTO original = getCafeteriaById(cafeteriaId);

        CafeteriaDTO updatedCafeteria = new CafeteriaDTO(
            original.id(), 
            original.name(), 
            original.brand(), 
            original.location(),
            rating,
            countReviews,
            original.imageUrl(),
            original.phoneNumber(),
            original.openingHour(),
            original.closingHour()
        );

        return updateCafeteria(cafeteriaId, updatedCafeteria);
    }
}
