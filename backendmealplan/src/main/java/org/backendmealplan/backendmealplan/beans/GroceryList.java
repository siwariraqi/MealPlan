package org.backendmealplan.backendmealplan.beans;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @NotNull
    private Integer week;
    @NotNull
    private Integer amount;
    private String unit;
    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToMany(mappedBy = "changes")
    List<User> users;

}
