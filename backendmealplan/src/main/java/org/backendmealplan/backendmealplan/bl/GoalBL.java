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

    public List<Goal> getAllGoals(){
        return this.goalsDAO.findAll();
    }

<<<<<<< HEAD
    public List<Goal> getalltexts(Collection<String> text){
        return this.goalsDAO.findByTextIn(text);
    }


=======
    public void addGoal(Goal goal) {
        //check if goal exists
        List<Goal> goals = this.goalsDAO.findByText(goal.getText());
        if (goals.isEmpty()) {
            this.goalsDAO.save(goal);
        }
    }
>>>>>>> 35d1d192c6c77056c3b58d1bbe1c7c6f947e9cb3
}
