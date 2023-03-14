package org.backendmealplan.backendmealplan.bl;

<<<<<<< HEAD
import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlanBL {
    @Autowired
    private UsersDAO usersDAO;


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

=======
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.DayMealsDAO;
import org.backendmealplan.backendmealplan.dao.DayPlanDAO;
import org.backendmealplan.backendmealplan.dao.DayPlanIdDAO;
import org.backendmealplan.backendmealplan.dao.PlansDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return this.dayPlanIdDAO.save(dayPlanId);
    }

    public DayPlan addDayPlan(DayPlan dayPlan){
        return this.dayPlanDAO.save(dayPlan);
    }
>>>>>>> dev-branch
}
