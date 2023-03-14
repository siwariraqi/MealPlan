package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersDAO extends JpaRepository<User, Long> {
    User findUserByuserId(Long id);
}
