package org.backendmealplan.backendmealplan.other;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DayMealDTO {

    private String plan;
    private String type;
    private Integer dayNumber;
}
