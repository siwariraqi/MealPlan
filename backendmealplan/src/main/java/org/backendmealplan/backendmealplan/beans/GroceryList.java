package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="grocery_list")
public class GroceryList {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groceryId;

    private Integer week;
    private Integer amount;
    private String unit; //change to eum
    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;
    @JsonIgnore
    @ManyToMany(mappedBy = "changes")
    List<User> users;

}
