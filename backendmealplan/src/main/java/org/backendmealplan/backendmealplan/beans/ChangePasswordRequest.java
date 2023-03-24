package org.backendmealplan.backendmealplan.beans;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    @NotBlank
    private long userId;
    @NotBlank
    private String currentPassword;
    @NotBlank
    private String newPassword;
    @NotBlank
    private String confirmPassword;

}