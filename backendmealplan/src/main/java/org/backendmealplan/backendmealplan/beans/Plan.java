package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "plans")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    private String planName;
    private String length;
    private double price;
    @Column(name = "includes", length = 1000)
    private String includes;
    @Column(name = "benefits", length = 1000)
    private String benefits;
//  @ToString.Exclude
    @JsonIgnore
    @OneToMany (mappedBy = "plan")
    private List<User> users;

//    @ToString.Exclude
    @JsonIgnore    /////// must
    @ManyToMany
    @JoinTable(
            name = "dayPlan",
            joinColumns = @JoinColumn(name = "plan_id"),
            inverseJoinColumns = @JoinColumn(name = "day_plan_id"))
    List<DayPlanId> dayPlanIdList;
   @ToString.Exclude
   @JsonIgnore
    @OneToMany (mappedBy = "plan")
    private List<GroceryList> groceryLists;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany (mappedBy = "plan")
    private List<Payment> payments;

}


