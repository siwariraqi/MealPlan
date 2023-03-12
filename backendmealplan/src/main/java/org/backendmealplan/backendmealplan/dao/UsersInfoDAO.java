package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersInfoDAO extends JpaRepository<UserInfo, Long> {

}
