package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.dao.PlansDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanBL {
    @Autowired
    PlansDAO plansDAO;
    public Plan addPlan(Plan plan){
        this.plansDAO.save(plan);
        System.out.println("Plan added successfully!");
        return plan;
    }

    public Plan getPlanById(Long id){
        return this.plansDAO.findPlanByplanId(id);
    }
}
