package com.Ecom.demoEcommerceWeb.dao;

import com.Ecom.demoEcommerceWeb.entity.Support;
import org.aspectj.bridge.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support,Long> {
}
