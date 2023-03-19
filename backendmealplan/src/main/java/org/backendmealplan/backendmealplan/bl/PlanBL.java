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
        List<Plan> plans = this.planDAO.findByPlanName(plan.getPlanName());
        if (plans.isEmpty()) {
            return this.planDAO.save(plan);
        }
        return null;
    }

    public DayPlanId addDayPlanId(DayPlanId dayPlanId) {
        //check if dayPlanId exists
        List<DayPlanId> dayPlanIds = this.dayPlanIdDAO.findByDayPlanId(dayPlanId.getDayPlanId());
        if (dayPlanIds.isEmpty()) {
            return this.dayPlanIdDAO.save(dayPlanId);
        }
        return null;
    }

    public DayPlan addDayPlan(DayPlan dayPlan) {
        //check if dayPlan exists
        List<DayPlan> dayPlanList = this.dayPlanDAO.findByDayPlanKey(dayPlan.getDayPlanKey());
        if (dayPlanList.isEmpty()) {
            return this.dayPlanDAO.save(dayPlan);
        }
        return null;
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

    public void printUsers(Long planId) {
        Plan plan = planDAO.findById(planId).orElse(null);

        if (plan == null) {
            System.out.println("University not found.");
            return;
        }

        List<User> users = plan.getUsers();

        if (users.isEmpty()) {
            System.out.println("No students found for this university.");
            return;
        }

        System.out.println("Students for " + plan.getPlanName() + ":");
        for (User user : users) {
            System.out.println("- " + user.getFirstName());
        }
    }

}