package com.cafe.backend.service;

import com.cafe.backend.data.TestData;
import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.mapper.CafeteriaMapper;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.service.impl.CafeteriaServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CafeteriaServiceTest {

    @Mock
    private CafeteriaRepository cafeteriaRepository;

    @InjectMocks
    private CafeteriaServiceImpl cafeteriaService;

    private final CafeteriaEntity cafeteria = TestData.createTestCafeteria();

    @Test
    void testCreateCafeteria() throws BadRequestException {
        CafeteriaDTO cafeteriaDTO = CafeteriaDTO.builder()
                .name("name")
                .brand("brand")
                .location("location")
                .rating(2)
                .countReview(1)
                .phoneNumber("+359890521491")
                .imageUrl("url")
                .openingHour(LocalTime.parse("06:00"))
                .closingHour(LocalTime.parse("18:00"))
                .build();

        when(cafeteriaRepository.save(Mockito.any(CafeteriaEntity.class))).thenReturn(cafeteria);

        CafeteriaDTO savedCafeteria = cafeteriaService.createCafeteria(cafeteriaDTO);
        assertNotNull(savedCafeteria);
    }

    @Test
    void getCafeteriaById() throws NotFoundException, BadRequestException {
        Long id = 1L;
        when(cafeteriaRepository.findById(id)).thenReturn(Optional.ofNullable(cafeteria));

        CafeteriaDTO result = cafeteriaService.getCafeteriaById(id);
        assertNotNull(result);
        verify(cafeteriaRepository).findById(id);
    }

    @Test
    void getCafeteriaById_returnNotFound_whenCafeteriaDoesNotExist() {
        Long id = 99L;
        when(cafeteriaRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> {
            cafeteriaService.getCafeteriaById(id);
        });
        verify(cafeteriaRepository).findById(id);
    }

    @Test
    void getCafeteriaById_returnBadRequest_whenCafeteriaIsNull() {
        assertThrows(BadRequestException.class, () -> {
            cafeteriaService.getCafeteriaById(null);
        });
        verifyNoInteractions(cafeteriaRepository);
    }

    @Test
    void testGetAllCafeterias() throws BadRequestException, NotFoundException {
        CafeteriaEntity entity1 = CafeteriaEntity.builder()
                .name("Cafe 1")
                .brand("Brand 1")
                .location("Location 1")
                .isDeleted(false)
                .build();

        CafeteriaEntity entity2 = CafeteriaEntity.builder()
                .name("Cafe 2")
                .brand("Brand 2")
                .location("Location 2")
                .isDeleted(false)
                .build();

        List<CafeteriaEntity> entities = List.of(entity1, entity2);

        when(cafeteriaRepository.findAll()).thenReturn(entities);

        try (MockedStatic<CafeteriaMapper> mockedMapper = Mockito.mockStatic(CafeteriaMapper.class)) {
            mockedMapper.when(() -> CafeteriaMapper.mapToDTO(entity1))
                    .thenReturn(CafeteriaDTO.builder().name("Cafe 1").build());

            mockedMapper.when(() -> CafeteriaMapper.mapToDTO(entity2))
                    .thenReturn(CafeteriaDTO.builder().name("Cafe 2").build());

            List<CafeteriaDTO> result = cafeteriaService.getAllCafeterias();

            assertThat(result).isNotNull();
            assertEquals(2, result.size());
            assertEquals("Cafe 1", result.get(0).name());
            assertEquals("Cafe 2", result.get(1).name());
        }
    }

    @Test
    void testGetAllCafeterias_ResourceNotFound() throws BadRequestException, NotFoundException {
        List<CafeteriaEntity> entities = new ArrayList<>();
        when(cafeteriaRepository.findAll()).thenReturn(entities);
        assertThrows(ResourceNotFoundException.class, () -> {
            cafeteriaService.getAllCafeterias();
        });
    }

    @Test
    void testUpdateCafeteria() throws NotFoundException, BadRequestException {
        Long id = 1L;
        CafeteriaDTO cafeteriaDTO = CafeteriaDTO.builder()
                .name("name")
                .brand("brand")
                .location("location")
                .rating(2)
                .countReview(1)
                .phoneNumber("+359890521491")
                .imageUrl("url")
                .openingHour(LocalTime.parse("06:00"))
                .closingHour(LocalTime.parse("18:00"))
                .build();

        when(cafeteriaRepository.findById(id)).thenReturn(Optional.ofNullable(cafeteria));
        when(cafeteriaRepository.save(Mockito.any(CafeteriaEntity.class))).thenReturn(cafeteria);
        CafeteriaDTO savedCafeteria = cafeteriaService.updateCafeteria(id, cafeteriaDTO);
        assertNotNull(savedCafeteria);
    }

    @Test
    void testUpdateCafeteria_NotFound() throws NotFoundException, BadRequestException {
        Long id = 99L;
        when(cafeteriaRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> {
            cafeteriaService.getCafeteriaById(id);
        });
        verify(cafeteriaRepository).findById(id);
    }

    @Test
    void updateCafeteriaReviewFields() throws BadRequestException, NotFoundException {
        Long id = 1L;
        int count = 1;
        double rating = 2;
        when(cafeteriaRepository.findById(id)).thenReturn(Optional.ofNullable(cafeteria));
        when(cafeteriaRepository.save(Mockito.any(CafeteriaEntity.class))).thenReturn(cafeteria);
        CafeteriaDTO savedCafeteria = cafeteriaService.updateCafeteriaReviewFields(id, count, rating);
        assertNotNull(savedCafeteria);
    }

    @Test
    void updateCafeteriaReviewFields_NotFound() throws NotFoundException {
        Long id = 1L;
        when(cafeteriaRepository.findById(id)).thenReturn(Optional.of(cafeteria));
        assertThrows(ResourceNotFoundException.class, () ->
                cafeteriaService.updateCafeteriaReviewFields(id, null, null));
    }

    @Test
    void updateCafeteriaReviewFields_ThrowsBadRequest() throws BadRequestException {
        Long id = 1L;
        Integer count = -5;
        Double rating = -2.0;

        when(cafeteriaRepository.findById(id)).thenReturn(Optional.of(cafeteria));

        assertThrows(BadRequestException.class, () ->
                cafeteriaService.updateCafeteriaReviewFields(id, count, rating)
        );
    }
}