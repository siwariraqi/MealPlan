package org.backendmealplan.backendmealplan.beans;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @JsonProperty("text")
    @Column(nullable = false)
    private String text;

    @JsonIgnore
    @ToString.Exclude
    @ManyToMany(mappedBy = "goals")
    List<UserInfo> usersInfo;

}