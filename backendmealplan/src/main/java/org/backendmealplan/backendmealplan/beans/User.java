package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Pattern(regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$",
            message = "Invalid phone number format")
    private String phoneNumber;

    @NotNull
    @OneToOne()
    @JoinColumn(name="info_id", unique=true)
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

    @JsonIgnore
    @OneToMany (mappedBy = "user")
    private List<UserFeedback> feedbacks;

}
