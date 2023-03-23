package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@NoArgsConstructor
@Table(name = "day_meals")
public class DayMeal {

    @EmbeddedId
    private DayMealKey id;
    @NotBlank
    private String type;
}
