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
import java.util.List;

/**
 * {@code CafeteriaServiceImpl} is a service class that implements {@link CafeteriaService}.
 * It interacts with the {@code cafeteriaRepository} to perform CRUD operations and retrieve data based on
 * the methods provided by {@code JpaRepository}, which {@link CafeteriaRepository} extends.
 * <p>
 * This service class is responsible for handling business logic related to cafeterias, including creating,
 * retrieving, updating cafeteria data, and managing cafeteria review fields.
 * </p>
 *
 * @author AngelStoynov
 */
@Service
@Transactional
public class CafeteriaServiceImpl implements CafeteriaService {

    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    /**
     * Creates a new cafeteria.
     *
     * @param cafeteriaDTO the {@code CafeteriaDTO} containing the data for the new cafeteria.
     * @return the created {@code CafeteriaDTO}.
     * @throws BadRequestException if the provided cafeteria data is invalid.
     */
    @Override
    public CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO) throws BadRequestException {
        CafeteriaEntity cafeteria = CafeteriaMapper.mapToEntity(cafeteriaDTO);
        cafeteria.setId(null);
        CafeteriaEntity savedCafeteria = cafeteriaRepository.save(cafeteria);
        return CafeteriaMapper.mapToDTO(savedCafeteria);
    }

    /**
     * Retrieves a cafeteria by its ID.
     *
     * @param id the ID of the cafeteria to retrieve.
     * @return the {@code CafeteriaDTO} representing the cafeteria with the given ID.
     * @throws NotFoundException if no cafeteria is found with the given ID.
     * @throws BadRequestException if the provided ID is invalid.
     */
    @Override
    public CafeteriaDTO getCafeteriaById(Long id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw new BadRequestException("Cafeteria ID cannot be null");
        }
        CafeteriaEntity cafeteria = cafeteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find cafeteria with this id: " + id));
        return CafeteriaMapper.mapToDTO(cafeteria);
    }

    /**
     * Retrieves a list of all cafeterias.
     *
     * @return a list of {@code CafeteriaDTO} representing all cafeterias.
     * @throws NotFoundException if no cafeterias are found.
     * @throws BadRequestException if an error occurs while retrieving cafeterias.
     */
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

    /**
     * Updates an existing cafeteria.
     *
     * @param id the ID of the cafeteria to update.
     * @param cafeteriaDTO the {@code CafeteriaDTO} containing the updated cafeteria data.
     * @return the updated {@code CafeteriaDTO}.
     * @throws NotFoundException if no cafeteria is found with the given ID.
     * @throws BadRequestException if the updated data is invalid.
     */
    @Override
    public CafeteriaDTO updateCafeteria(Long id, CafeteriaDTO cafeteriaDTO)
            throws NotFoundException, BadRequestException {
        CafeteriaEntity cafeteria = cafeteriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find cafeteria with this id:" + id));
        CafeteriaEntity newUpdatedCafeteria = updateCafeteriaFields(cafeteriaDTO, cafeteria);
        return CafeteriaMapper.mapToDTO(newUpdatedCafeteria);
    }

    /**
     * Updates the review-related fields (count of reviews and rating) for a cafeteria.
     *
     * @param cafeteriaId the ID of the cafeteria to update.
     * @param countReviews the new count of reviews for the cafeteria.
     * @param rating the new average rating for the cafeteria.
     * @return the updated {@code CafeteriaDTO}.
     * @throws BadRequestException if the provided data is invalid.
     * @throws NotFoundException if the cafeteria is not found.
     */
    @Override
    public CafeteriaDTO updateCafeteriaReviewFields(Long cafeteriaId, Integer countReviews, Double rating)
            throws BadRequestException, NotFoundException {
        CafeteriaDTO original = getCafeteriaById(cafeteriaId);
        validateUpdateCafeteriaFields(countReviews, rating);
        CafeteriaDTO updatedCafeteria = new CafeteriaDTO(
                original.id(),
                original.name(),
                original.brand(),
                original.location(),
                rating,
                countReviews,
                original.phoneNumber(),
                original.openingHour(),
                original.closingHour(),
                original.imageUrl()
        );
        return updateCafeteria(cafeteriaId, updatedCafeteria);
    }

    /**
     * Validates the provided fields (count of reviews and rating) for the cafeteria update.
     *
     * @param countReviews the count of reviews.
     * @param rating the rating of the cafeteria.
     * @throws ResourceNotFoundException if either field is not found.
     * @throws BadRequestException if either field is less than 0.
     */
    private void validateUpdateCafeteriaFields(Integer countReviews, Double rating)
            throws ResourceNotFoundException, BadRequestException {
        if (countReviews == null || rating == null) {
            throw new ResourceNotFoundException("Rating or count reviews were not found");
        }
        if (countReviews < 0 || rating < 0) {
            throw new BadRequestException("Rating or review cannot be less than 0");
        }
    }

    /**
     * Updates the fields of an existing cafeteria with the provided data.
     *
     * @param updatedCafeteria the new data to update the cafeteria with.
     * @param cafeteria the {@code CafeteriaEntity} to update.
     * @return the updated {@code CafeteriaEntity}.
     */
    private CafeteriaEntity updateCafeteriaFields(CafeteriaDTO updatedCafeteria, CafeteriaEntity cafeteria) {
        cafeteria.setName(updatedCafeteria.name());
        cafeteria.setBrand(updatedCafeteria.brand());
        cafeteria.setLocation(updatedCafeteria.location());
        cafeteria.setRating(updatedCafeteria.rating());
        cafeteria.setCountReview(updatedCafeteria.countReview());
        cafeteria.setPhoneNumber(updatedCafeteria.phoneNumber());
        cafeteria.setOpeningHour(updatedCafeteria.openingHour());
        cafeteria.setClosingHour(updatedCafeteria.closingHour());
        cafeteria.setImageUrl(updatedCafeteria.imageUrl());
        return cafeteriaRepository.save(cafeteria);
    }
}
