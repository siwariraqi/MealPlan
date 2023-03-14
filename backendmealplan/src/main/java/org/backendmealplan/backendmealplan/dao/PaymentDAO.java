package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentDAO extends JpaRepository<Payment, Long> {
  Optional<Payment> findByUserUserId(Long userId);
}
