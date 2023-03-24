package org.backendmealplan.backendmealplan.enums;

public enum DietTypes {
    GLUTEN_FREE("GLUTEN FREE"),
    DAIRY_FREE("DAIRY FREE"),
    KETO_FRIENDLY("KETO FRIENDLY"),
    VEGAN_FRIENDLY("VEGAN FRIENDLY");

    private final String value;

    DietTypes(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}