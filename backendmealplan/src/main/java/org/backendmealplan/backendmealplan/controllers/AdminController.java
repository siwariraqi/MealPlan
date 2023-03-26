package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.PlanNotExistedException;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserBL userBL;

    @GetMapping("/getall")
    public ResponseEntity<List<User>> getAll() {
        try {
            List<User> users = userBL.getAll();
            for (User user : users) {
                user.setPassword(null);
            }
            return ResponseEntity.ok(users);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam Long adminId, @RequestParam Long userId) {
        try {
            userBL.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/resetUser")
    public ResponseEntity resetUser(@RequestParam Long adminId ,@RequestParam Long userId) {
        try {
            userBL.resetUser(userId);
            return ResponseEntity.ok().build();
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateUserPlan(@RequestParam Long adminId, @RequestParam Long userId, @RequestParam String planName) {
        try {
            User user = userBL.updateUserPlan(userId, planName);
            return (ResponseEntity) ResponseEntity.ok(user);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (PlanNotExistedException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/changeRole")
    public ResponseEntity UpdateUserRole(@RequestParam Long adminId, @RequestParam Long userId, @RequestParam Boolean isAdmin) {
        try {
            userBL.updateUserRole(userId, isAdmin);
            return ResponseEntity.ok().build();
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
