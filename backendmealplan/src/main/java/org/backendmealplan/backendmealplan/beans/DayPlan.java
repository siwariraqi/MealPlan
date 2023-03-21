package org.backendmealplan.backendmealplan.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dayPlan")
public class DayPlan {

    @EmbeddedId
    private DayPlanKey dayPlanKey;
    private Integer dayNumber;
    private String dailyCalories;

}
