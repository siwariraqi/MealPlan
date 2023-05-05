package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userInfo")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long infoId;

    private Double height;
    private Double weight;
    private String unit;


    //    @Past(message = "Birthday must be valid")
//    @Max(value = MAX_BIRTHDAY, message = "Birthday cannot be after 2004-01-01")
//    @Min(value = MIN_BIRTHDAY, message = "Birthday cannot be before 1922-01-01")
    @JsonIgnore
    private LocalDate birthday;

    private Integer activity;
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
