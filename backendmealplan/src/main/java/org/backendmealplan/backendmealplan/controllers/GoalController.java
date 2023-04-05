package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.Goal;
import org.backendmealplan.backendmealplan.bl.GoalBL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("goals")
@CrossOrigin
public class GoalController {
    @Autowired
    private GoalBL goalBL;

    @GetMapping("all")
    @PreAuthorize("hasAuthority('Admin') or hasAuthority('User')")
    public ResponseEntity getAllGoals(){
        List<Goal> goalList = null;
        try {
            goalList = this.goalBL.getAllGoals();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(goalList);
    }
}
