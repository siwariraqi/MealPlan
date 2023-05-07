package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.Goal;
import org.backendmealplan.backendmealplan.dao.GoalsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class GoalBL {
    @Autowired
    GoalsDAO goalsDAO;

    public List<Goal> getAllGoals() throws Exception {
        List<Goal> goals = this.goalsDAO.findAll();
        if (goals == null || goals.isEmpty()) {
            throw new Exception("No goals found");
        }
        return goals;
    }

    public List<Goal> getAllTexts(Collection<String> text){
        return this.goalsDAO.findByTextIn(text);
    }

    public void addGoal(Goal goal) {
        //check if goal exists
        Goal returnedGoal = this.goalsDAO.findByText(goal.getText());
        if (returnedGoal==null) {
            this.goalsDAO.save(goal);
        }
    }
}