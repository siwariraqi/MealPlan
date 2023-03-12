package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import javax.persistence.*;

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
