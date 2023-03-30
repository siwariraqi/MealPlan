package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping("users")
@CrossOrigin
public class UsersController {
    @Autowired
    private UserBL userBL;

    @PostMapping("addUserInfo")
    public ResponseEntity addUserInfo(@Valid @RequestBody UserInfo userInfo) {
        userInfo.setInfoId(null); // set infoId to null to ensure client cannot set it
        UserInfo updatedUserInfo = userBL.addUserInfoGoals(userInfo);
        return ResponseEntity.ok(updatedUserInfo);
    }

    @PutMapping("updateUserInfo")
    public ResponseEntity updateUserInfo(@Valid @RequestBody UserInfo userInfo) {
        UserInfo updatedUserInfo = null;
        try {
            if (userInfo != null) {
                long userInfoId = userInfo.getInfoId();
                updatedUserInfo = userBL.updateUserInfo(userInfoId, userInfo);
            }

        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUserInfo);
    }


    @PostMapping("/choosePlan")
    public ResponseEntity<Void> choosePlan(@RequestParam Long loggedInUserId , @RequestParam Long planId) {
        try {
            User user = this.userBL.userSetPlan(loggedInUserId , planId);// update the user's plan and save
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping("/updateProfile")
    public ResponseEntity updateProfile(@RequestBody User user) {
        try {
            this.userBL.updateProfile(user);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        user.setPassword(null); // remove password field
        return new ResponseEntity(user, HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity deleteAccount(@RequestParam String email,
                                        @RequestParam String password,
                                        @RequestParam Long loggedInUserId ) {
        if (email == null || password == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
            this.userBL.deleteAccount(email, password, loggedInUserId );
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resetAccount")
    public ResponseEntity resetAccount(@RequestParam String email,
                                       @RequestParam String password,
                                       @RequestParam Long loggedInUserId ) {
        if (email == null || password == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
            this.userBL.resetAccount(email, password, loggedInUserId );
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }


    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            this.userBL.changePassword(request.getUserId(), request.getCurrentPassword(), request.getNewPassword(), request.getConfirmPassword());
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forget-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {

        try {
            userBL.forgotPassword(email);

            return ResponseEntity.ok().build();
        } catch (userNotFoundException e) {
            System.out.println(e);
            return ResponseEntity.notFound().build();
        } catch (TokenExpiredException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (InvalidTokenException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("reset-password")
    public ResponseEntity showResetPasswordForm(@RequestParam String token) {
        try {
            PasswordResetToken passwordResetToken = this.userBL.getResetPasswordToken(token);
            // If the token is valid, return an appropriate response
            return ResponseEntity.ok().build();
        } catch (TokenExpiredException e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.badRequest().body(e.getMessage());
        }  catch (InvalidTokenException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestParam ResetPassword passwordReset) {
        String newPassword = passwordReset.getPassword();
        String token = passwordReset.getToken();

        try {
            userBL.resetPassword(token, newPassword);
            return ResponseEntity.ok("Password reset successful!");
        } catch (TokenExpiredException | InvalidTokenException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam long loggedInUserId ) {
        try {
            User user = userBL.getUser(loggedInUserId );
            user.setPassword(null); // remove password field
            return ResponseEntity.ok(user);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user) {
        try {
            User u = userBL.authentication(user.getEmail(), user.getPassword());
            u.setPassword(null);
            return new ResponseEntity(u, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @Transactional
    @PostMapping("/adduser")
    public ResponseEntity adduser(@Valid @RequestBody User user) {
        user.setUserId(null); // set userId to null to ensure client cannot set it
        try {
            User u = userBL.adduser(user);
            return new ResponseEntity(u, HttpStatus.OK);
        } catch (userExistException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.CONFLICT);
        } catch (InvalidUserException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
