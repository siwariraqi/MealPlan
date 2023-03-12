package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDAO extends JpaRepository<Payment, Long> { }
