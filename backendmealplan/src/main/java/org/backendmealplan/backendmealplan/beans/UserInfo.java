package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userInfo")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long infoId;
    private Double height;
    private Double weight;
    private String unit;
    private String birthday;
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
