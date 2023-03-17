package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.bl.PlanBL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("plans")
@CrossOrigin
public class PlanController {
    @Autowired
    PlanBL planBL;
    @PostMapping("/add")
    public ResponseEntity addPlan(@RequestBody Plan plan){
        Plan newPlan = this.planBL.addPlan(plan);
        return ResponseEntity.ok(newPlan);
    }

    @GetMapping("/getPlans")
    public List<Plan> getPlans(){
        return  this.planBL.getAllPlans();
    }
}
