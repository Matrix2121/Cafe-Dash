package com.cafe.backend.service;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

import java.util.List;

/**
 * {@code CafeteriaService} is a service interface that defines core operations
 * for managing cafeterias in the system.
 *
 * <p>It provides standard CRUD functionality as well as specific operations
 * such as updating review-related fields (e.g., rating and review count).</p>
 *
 * <p>Exceptions such as {@link BadRequestException} and {@link NotFoundException}
 * are used to signal input validation errors or missing resources respectively.</p>
 *
 * @author AngelStoynov
 */
public interface CafeteriaService {

    /**
     * Creates a new cafeteria with the provided data.
     *
     * @param cafeteriaDTO The data of the cafeteria to be created.
     * @return The newly created {@link CafeteriaDTO}.
     * @throws BadRequestException if input validation fails.
     */
    CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO) throws BadRequestException;

    /**
     * Retrieves a cafeteria by its unique identifier.
     *
     * @param id The ID of the cafeteria.
     * @return The corresponding {@link CafeteriaDTO}.
     * @throws NotFoundException if no cafeteria with the given ID exists.
     * @throws BadRequestException if the ID is invalid.
     */
    CafeteriaDTO getCafeteriaById(Long id) throws NotFoundException, BadRequestException;

    /**
     * Retrieves all cafeterias from the system.
     *
     * @return A list of all {@link CafeteriaDTO} instances.
     * @throws NotFoundException if no cafeterias are found.
     * @throws BadRequestException if the request is malformed.
     */
    List<CafeteriaDTO> getAllCafeterias() throws NotFoundException, BadRequestException;

    /**
     * Updates an existing cafeteria with new data.
     *
     * @param id           The ID of the cafeteria to update.
     * @param cafeteriaDTO The updated data for the cafeteria.
     * @return The updated {@link CafeteriaDTO}.
     * @throws NotFoundException if the cafeteria is not found.
     * @throws BadRequestException if the provided data is invalid.
     */
    CafeteriaDTO updateCafeteria(Long id, CafeteriaDTO cafeteriaDTO) throws NotFoundException, BadRequestException;

    /**
     * Updates the review-related fields (review count and rating) for a cafeteria.
     *
     * @param cafeteriaId  The ID of the cafeteria to update.
     * @param countReviews The new total number of reviews.
     * @param rating       The updated average rating.
     * @return The updated {@link CafeteriaDTO}.
     * @throws BadRequestException if input is invalid.
     * @throws NotFoundException if the cafeteria is not found.
     */
    CafeteriaDTO updateCafeteriaReviewFields(Long cafeteriaId, Integer countReviews, Double rating) throws BadRequestException, NotFoundException;
}

