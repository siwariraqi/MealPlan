package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @NotNull
    private Boolean isOnIt;

    private Date date;

    private int rating = -1;

    @NotNull
    private String feedbackText;

}

