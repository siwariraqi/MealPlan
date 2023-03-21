package org.backendmealplan.backendmealplan.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "feedbacks")
public class UserFeedback {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;
    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Boolean isOnIt;
    private Date date;
    private int rating=-1;
    private String feedbackText;

}

