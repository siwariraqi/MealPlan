package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "plans")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;
    @NotBlank
    private String planName;
    @NotBlank
    private String length;
    @NotNull
    private double price;

    @NotBlank
    @Column(name = "includes", length = 2500)
    private String includes;

    @NotBlank
    @Column(name = "benefits", length = 2500)
    private String benefits;

//  @ToString.Exclude
    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "plan")
    private List<User> users = new ArrayList<>();

    @JsonIgnore
    @ToString.Exclude
    @ManyToMany
    @JoinTable(
            name = "dayPlan",
            joinColumns = @JoinColumn(name = "plan_id"),
            inverseJoinColumns = @JoinColumn(name = "day_plan_id"))
    List<DayPlanId> dayPlanIdList = new ArrayList<>();

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "plan")
    private List<GroceryList> groceryLists;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "plan")
    private List<Payment> payments;

}


