package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name="day_plan_key")
public class DayPlanId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dayPlanId;

    @ManyToMany(mappedBy = "dayPlanIdList")
    List<Plan> planList;

    @ManyToMany
    @JoinTable(
            name = "day_meals",
            joinColumns = @JoinColumn(name = "day_plan_id"),
            inverseJoinColumns = @JoinColumn(name = "meal_id"))
    List<Meal> meals;
}
