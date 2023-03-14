package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.backendmealplan.backendmealplan.beans.DayPlanId;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.*;
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


    public Plan getPlan(Long userid) throws UserNotFoundException {

        Optional<User> users = this.usersDAO.findById(userid);
        if (users.isPresent()) {
            User user = users.get();
            Plan plan = user.getPlan();
            return plan;
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

  public List<Plan> getPlans(){
    return planDAO.findAll();
  }

    public Plan addPlan(Plan plan) {
        //check if plan exists
        List<Plan> plans = this.planDAO.findByPlanName(plan.getPlanName());
        if (plans.isEmpty()) {
            this.planDAO.save(plan);
        }
        return plan;
    }

    public DayPlanId addDayPlanId(DayPlanId dayPlanId){
        return this.dayPlanIdDAO.save(dayPlanId);
    }

    public DayPlan addDayPlan(DayPlan dayPlan){
        return this.dayPlanDAO.save(dayPlan);
    }

}
