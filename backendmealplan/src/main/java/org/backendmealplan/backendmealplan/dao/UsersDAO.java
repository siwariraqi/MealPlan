package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersDAO extends JpaRepository<User, Long> {

    User findUserByEmailAndPassword(String email,String password);

    User findByEmail(String email);

    User findByUserId(Long id);

    void deleteUserByUserId(Long id);

    @Modifying
    @Query("UPDATE User u SET u.userRole = :userRole WHERE u.userId = :userId")
    void updateUserRole(@Param("userId") Long userId, @Param("userRole") Role userRole);

}
