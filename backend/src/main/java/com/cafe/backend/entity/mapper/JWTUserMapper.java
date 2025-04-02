package com.cafe.backend.entity.mapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.cafe.backend.dto.JWTUserDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * @author ZapryanZapryanov
 */

public class JWTUserMapper {
	
	public static JWTUserDTO mapToDTO(UserEntity userEntity) throws DataMappingException {
		
        List<String> rolesSet = new ArrayList<>();
        if(userEntity.getRoles() != null) {
        	for (RoleEntity role : userEntity.getRoles()) {
                rolesSet.add(role.getRoleName());
            }
        }

        return new JWTUserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                rolesSet
        );
	}
}
