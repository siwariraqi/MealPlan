package org.backendmealplan.backendmealplan.beans;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;
    @Column(nullable = false, unique = true)
    private String token;
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    private User user;
    @Column(nullable = false)
    private LocalDateTime expirationDate;
}