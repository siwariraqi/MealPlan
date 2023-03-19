package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import org.backendmealplan.backendmealplan.enums.PaymentTool;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @NotNull(message = "Payment date can't be null")
    private Date paymentOfDate;

    @NotNull(message = "Start date can't be null")
    private Date startDate;

    @NotNull(message = "End date can't be null")
    private Date endDate;

    @NotNull(message = "Payment tool can't be null")
    private PaymentTool paymentTool;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
