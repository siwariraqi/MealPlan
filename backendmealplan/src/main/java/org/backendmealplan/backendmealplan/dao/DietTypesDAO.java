package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DietType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DietTypesDAO extends JpaRepository<DietType, Long> {

    DietType findByText(String text);

}
