package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstName;

    private String lastName;

    private String password;

    private String phoneNumber;

    private String userName;

    private String email;

    @OneToOne()
    @JoinColumn(name="info_id")
    private UserInfo userInfo;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @OneToMany (mappedBy = "user")
    private List<Payment> payments;

    @ManyToMany
    @JoinTable(
            name = "user_changes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "grocery_list_id"))
    Set<GroceryList> changes;

    @OneToMany (mappedBy = "user")
    private List<UserFeedback> feedbacks=new ArrayList<>();

}
