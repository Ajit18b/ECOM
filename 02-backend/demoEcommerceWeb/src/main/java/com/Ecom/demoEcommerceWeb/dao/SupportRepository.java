package com.Ecom.demoEcommerceWeb.dao;

import com.Ecom.demoEcommerceWeb.entity.Support;
import org.aspectj.bridge.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface SupportRepository extends JpaRepository<Support,Long> {

    Page<Support> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);
    Page<Support> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);

}
