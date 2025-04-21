package com.cafe.backend.entity.passwordReset;

import java.util.Date;

import com.cafe.backend.entity.account.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * {@code PasswordResetToken} is an entity class representing a token used for password reset.
 * This class stores information about the reset token, including the associated user and the token's expiry date.
 * <p>
 * The entity is mapped to the {@code reset_token} table in the database and includes a reference to the user entity
 * that the token is associated with, as well as the token itself and the token's expiry date.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Entity
@Data
@Builder
@Table(name = "reset_token")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private Date expiryDate;
}