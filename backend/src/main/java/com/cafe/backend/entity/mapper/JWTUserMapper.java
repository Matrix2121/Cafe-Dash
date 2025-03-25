package com.cafe.backend.entity.mapper;

import java.util.HashSet;
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
		
        Set<String> rolesSet = new HashSet<>();
        if(userEntity.getRoles() != null) {
        	for (RoleEntity role : userEntity.getRoles()) {
                rolesSet.add(role.getRoleName());
            }
        }

        return new JWTUserDTO(
                userEntity.getUsername(),
                userEntity.getPassword(),
                rolesSet);
	}
}
