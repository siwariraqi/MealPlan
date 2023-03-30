package org.backendmealplan.backendmealplan.beans;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ResetPassword {

    @NotEmpty
    private String password;

    @NotEmpty
    private String ConfirmPassword;

    @NotEmpty
    private String token;
}