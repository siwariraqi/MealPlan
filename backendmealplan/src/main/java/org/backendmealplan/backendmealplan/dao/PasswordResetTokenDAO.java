package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenDAO extends JpaRepository<PasswordResetToken,Long> {


    PasswordResetToken findByToken(String token);

}
