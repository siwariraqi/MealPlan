package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.backendmealplan.backendmealplan.enums.Role;
import javax.persistence.*;
import javax.validation.constraints.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
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

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private Role userRole = Role.User;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String phoneNumber;

    @NotNull
    @OneToOne()
    @JoinColumn(name="info_id", unique=true)
    private UserInfo userInfo;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private Date registerDate;

    @OneToMany (mappedBy = "user")
    private List<Payment> payments;

    @ManyToMany
    @JoinTable(
            name = "user_changes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "grocery_list_id"))
    Set<GroceryList> changes;

    @JsonIgnore
    @OneToMany (mappedBy = "user")
    private List<UserFeedback> feedbacks;
}
