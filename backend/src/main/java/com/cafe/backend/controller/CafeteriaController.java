package com.cafe.backend.controller;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.exception.AuthenticationCustomException;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.CafeteriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The {@code CafeteriaController} serves as the RESTful API entry point for
 * managing cafeterias.
 * <p>
 * This controller handles HTTP requests from the frontend and interacts with
 * the service layer
 * to perform CRUD operations on products.
 * </p>
 *
 * @author AngelStoynov
 */

@RestController
@RequestMapping("/api/cafeterias")
public class CafeteriaController {

    @Autowired
    private CafeteriaService cafeteriaService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public CafeteriaDTO createCafeteria(@RequestBody CafeteriaDTO cafeteriaDTO) throws BadRequestException {
        return cafeteriaService.createCafeteria(cafeteriaDTO);
    }

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public CafeteriaDTO getCafeteriaById(@PathVariable("id") Long id) throws BadRequestException, NotFoundException {
        // checkUserHasRole("admin");
        return cafeteriaService.getCafeteriaById(id);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<CafeteriaDTO> getAllCafeterias() throws BadRequestException, NotFoundException {
        return cafeteriaService.getAllCafeterias();
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public CafeteriaDTO updateCafeteria(@PathVariable("id") Long id, @RequestBody CafeteriaDTO updatedCafeteriaDTO)
            throws NotFoundException, BadRequestException {
        return cafeteriaService.updateCafeteria(id, updatedCafeteriaDTO);
    }

    public void checkUserHasRole(String wantedRole) throws AuthenticationCustomException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null ||
                authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals(wantedRole))) {
            throw new AuthenticationCustomException("User does not have the required guest role.");
        }
    }
}
