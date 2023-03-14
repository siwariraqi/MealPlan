package org.backendmealplan.backendmealplan.beans;
import javax.persistence.*;
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

    @Column(nullable = false)
    private String text;

    @ManyToMany(mappedBy = "goals")
    List<UserInfo> usersInfo;

}