package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class test {
@GetMapping
    public DayPlan test(){

        return null;
    }
}