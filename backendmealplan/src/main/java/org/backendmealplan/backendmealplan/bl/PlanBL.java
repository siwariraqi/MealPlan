package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.backendmealplan.backendmealplan.beans.DayPlanId;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.*;


import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.DayMealsDAO;
import org.backendmealplan.backendmealplan.dao.DayPlanDAO;
import org.backendmealplan.backendmealplan.dao.DayPlanIdDAO;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.dao.PlansDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanBL {
    @Autowired
    private UsersDAO usersDAO;
    @Autowired
    PlansDAO planDAO;
    @Autowired
    DayPlanIdDAO dayPlanIdDAO;

    @Autowired
    DayPlanDAO dayPlanDAO;
    @Autowired
    DayMealsDAO dayMealsDAO;


    public Plan getPlan(Long userid) throws userNotFoundException {
        Optional<User> users = this.usersDAO.findById(userid);
        if (users.isPresent()) {
            User user = users.get();
            Plan plan = user.getPlan();
            return plan;
        } else {
            throw new userNotFoundException("User not found");
        }
    }


    public Plan addPlan(Plan plan) {
        //check if plan exists
        Plan returnedPlan = this.planDAO.findByPlanName(plan.getPlanName());
        if (returnedPlan==null) {
            return this.planDAO.save(plan);
        }
        return null;
    }

    public DayPlanId addDayPlanId(DayPlanId dayPlanId) {
        //check if dayPlanId exists
        DayPlanId dayPlanIds = this.dayPlanIdDAO.findByDayPlanId(dayPlanId.getDayPlanId());
        if (dayPlanIds==null) {
            return this.dayPlanIdDAO.save(dayPlanId);
        }
        return dayPlanIds;
    }

    public DayPlan addDayPlan(DayPlan dayPlan) {
        //check if dayPlan exists
        DayPlan dayPlanList = this.dayPlanDAO.findByDayPlanKey(dayPlan.getDayPlanKey());
        if (dayPlanList==null) {
            return this.dayPlanDAO.save(dayPlan);
        }
        return dayPlanList;
    }

    public List<DayMeal> getAllDayMeals() {
        return this.dayMealsDAO.findAll();
    }

    public List<Plan> getAllPlans() {
        return this.planDAO.findAll();
    }

    public Plan getPlanById(Long id) {
        return this.planDAO.findPlanByPlanId(id);

    }

}
