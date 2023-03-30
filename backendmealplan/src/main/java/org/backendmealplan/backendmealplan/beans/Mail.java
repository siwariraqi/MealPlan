package org.backendmealplan.backendmealplan.beans;

import lombok.Data;

import java.util.Map;

@Data
public class Mail {
    private String from;
    private String to;
    private String subject;
    private String emailContent;
    private Map<String, Object> model;


    public void setFrom(String email, String name) {
        String from = String.format("%s <%s>", name, email);
        this.from = from;
    }


}
