package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userInfo")
public class UserInfo {
//    private static final LocalDate MAX_BIRTHDAY = LocalDate.of(2004, 1, 1);
//    private static final LocalDate MIN_BIRTHDAY = LocalDate.of(1922, 1, 1);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long infoId;

    private Double height;
    private Double weight;
    private String unit;


    @Past(message = "Birthday must be valid")
//    @Max(value = MAX_BIRTHDAY, message = "Birthday cannot be after 2004-01-01")
//    @Min(value = MIN_BIRTHDAY, message = "Birthday cannot be before 1922-01-01")
    private LocalDate birthday;

    private String activity;
    private String medicalRisk;
    private Boolean isReceiveTreatment;
    private String gender;

    @ManyToMany
    @JoinTable(
            name = "user_goals",
            joinColumns = @JoinColumn(name = "user_info_id"),
            inverseJoinColumns = @JoinColumn(name = "goal_id"))
    Set<Goal> goals;

}
