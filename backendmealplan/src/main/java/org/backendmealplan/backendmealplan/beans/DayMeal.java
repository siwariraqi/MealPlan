package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "day_meals")
public class DayMeal {

    @EmbeddedId
    private DayMealKey id;
    private String Type; //change to enum
}
