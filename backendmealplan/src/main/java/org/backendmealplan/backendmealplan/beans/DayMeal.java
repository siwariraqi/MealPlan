package org.backendmealplan.backendmealplan.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@Table(name = "day_meals")
public class DayMeal {

    @EmbeddedId
    private DayMealKey id;
    private String Type;
}
