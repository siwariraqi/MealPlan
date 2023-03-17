package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFeedbacksDAO extends JpaRepository<UserFeedback, Long> {

  List<UserFeedback> findByUserAndMeal(User user, Meal meal);
}

