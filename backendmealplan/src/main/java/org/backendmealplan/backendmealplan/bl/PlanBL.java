package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.DayMealsDAO;
import org.backendmealplan.backendmealplan.dao.DayPlanDAO;
import org.backendmealplan.backendmealplan.dao.DayPlanIdDAO;
import org.backendmealplan.backendmealplan.dao.PlansDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanBL {

    @Autowired
    PlansDAO planDAO;
    @Autowired
    DayPlanIdDAO dayPlanIdDAO;

    @Autowired
    DayPlanDAO dayPlanDAO;

    @Autowired
    DayMealsDAO dayMealsDAO;
    public Plan addPlan(Plan plan) {
        //check if plan exists
        List<Plan> plans = this.planDAO.findByPlanName(plan.getPlanName());
        if (plans.isEmpty()) {
            this.planDAO.save(plan);
        }
        return plan;
    }

    public DayPlanId addDayPlanId(DayPlanId dayPlanId){
        //check if dayPlanId exists
        List<DayPlanId> dayPlanIds = this.dayPlanIdDAO.findByDayPlanId(dayPlanId.getDayPlanId());
        if(dayPlanIds.isEmpty()) {
            return this.dayPlanIdDAO.save(dayPlanId);
        }
        return null;
    }

    public DayPlan addDayPlan(DayPlan dayPlan){
        //check if dayPlan exists
        List<DayPlan> dayPlanList = this.dayPlanDAO.findByDayPlanKey(dayPlan.getDayPlanKey());
        if(dayPlanList.isEmpty()) {
            return this.dayPlanDAO.save(dayPlan);
        }
        return null;
    }

    public List<DayMeal> getAllDayMeals(){
        return this.dayMealsDAO.findAll();
    }

    public List<Plan> getAllPlans(){
        return this.planDAO.findAll();
    }
}
