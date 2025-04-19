package com.cafe.backend.entity.mapper;

import java.util.ArrayList;
import java.util.List;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.dto.UpdateUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

public class UpdateUserMapper {
	
public static UpdateUserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
		
        List<String> roles = new ArrayList<>();
        if(userEntity.getRoles() != null) {
        	for (RoleEntity role : userEntity.getRoles()) {
        		roles.add(role.getRoleName());
            }
        }

        return new UpdateUserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                roles
        );
	}
}
