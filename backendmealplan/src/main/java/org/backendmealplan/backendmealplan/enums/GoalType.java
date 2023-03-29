package org.backendmealplan.backendmealplan.enums;

public enum GoalType {
    BE_HEALTHIER("Be Healthier"),
    MANAGE("Manage my glucose"),
    ENERGY_LEVELS("Increase my energy levels"),
    LOSE_WEIGHT("Lose weight"),
    COOK("Learn to cook"),
    RECIPES("Learn new recipes");
    private final String value;

    GoalType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
