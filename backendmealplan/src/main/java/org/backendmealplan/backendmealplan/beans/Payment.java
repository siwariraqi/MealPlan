package org.backendmealplan.backendmealplan.beans;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name="payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private Date paymentOfDate;
    private Date startDate;
    private Date endDate;
    private String paymentTool;  //change to enum

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
