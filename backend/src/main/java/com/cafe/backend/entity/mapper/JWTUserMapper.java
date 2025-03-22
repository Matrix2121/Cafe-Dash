package com.cafe.backend.entity.mapper;

import java.util.HashSet;
import java.util.Set;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.RoleDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

public class JWTUserMapper {
	
	public static JWTUserDTO ToDTO(UserEntity userEntity) throws DataMappingException {
			
            Set<RoleDTO> roleDTOS = new HashSet<>();
            if(userEntity.getRoles() != null) {
            	for (RoleEntity role : userEntity.getRoles()) {
                    roleDTOS.add(RoleMapper.mapToDTO(role));
                }
            }

            return new JWTUserDTO(
                    userEntity.getUsername(),
                    userEntity.getPassword(),
                    roleDTOS);
	}
}
