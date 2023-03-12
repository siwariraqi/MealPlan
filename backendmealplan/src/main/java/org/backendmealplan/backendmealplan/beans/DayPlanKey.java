package org.backendmealplan.backendmealplan.beans;

import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
public class DayPlanKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "day_plan_id")
    private DayPlanId dayPlanId;
}