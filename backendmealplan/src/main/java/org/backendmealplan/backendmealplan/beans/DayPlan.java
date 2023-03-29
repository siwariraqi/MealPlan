package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dayPlan")
public class DayPlan {

    @EmbeddedId
    private DayPlanKey dayPlanKey;
    @NotNull
    private Integer dayNumber;

    private Integer dailyCalories;

}
