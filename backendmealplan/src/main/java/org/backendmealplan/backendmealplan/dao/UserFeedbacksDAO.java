package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFeedbacksDAO extends JpaRepository<UserFeedback, Long> { }

