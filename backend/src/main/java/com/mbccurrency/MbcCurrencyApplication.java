package com.mbccurrency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.mbccurrency.repository.jpa")
@EnableMongoRepositories(basePackages = "com.mbccurrency.repository.mongo")

public class MbcCurrencyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MbcCurrencyApplication.class, args);
    }
}
