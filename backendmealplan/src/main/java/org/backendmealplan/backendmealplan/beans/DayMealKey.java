package org.backendmealplan.backendmealplan.beans;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
public class DayMealKey implements Serializable {
    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "day_plan_id")
    private DayPlanId planDayId;

}
