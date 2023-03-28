package org.backendmealplan.backendmealplan.other;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DayNumberDTO {

    private Integer dayNumber;
    private List<String>  mealTimeList;
}
