package com.pcforge.builder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PcBuilderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PcBuilderServiceApplication.class, args);
    }
}
