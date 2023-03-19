//package org.backendmealplan.backendmealplan.beans;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.ToString;
//
//import javax.persistence.*;
//import java.util.List;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "diet_types")
//public class DietTypes {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long dietTypeId;
//
//    @JsonProperty("text")
//    @Column(nullable = false)
//    private String text;
//
//    @JsonIgnore
//    @ToString.Exclude
//    @ManyToMany(mappedBy = "dietTypes")
//    List<Meal> meals;
//
//}
