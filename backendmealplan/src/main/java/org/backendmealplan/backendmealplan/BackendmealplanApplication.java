package org.backendmealplan.backendmealplan;

import org.backendmealplan.backendmealplan.bl.InitDataBL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class BackendmealplanApplication implements CommandLineRunner {

	@Autowired
	InitDataBL InitDataBL;
	public static void main(String[] args){
		SpringApplication.run(BackendmealplanApplication.class, args);
	}
	@Override
	public void run(String... args) {
		InitDataBL.run();
	}
}
