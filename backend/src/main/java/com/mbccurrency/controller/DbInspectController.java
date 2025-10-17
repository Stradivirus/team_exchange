package com.mbccurrency.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;   // ← RestController, GetMapping 등 여기서 옴
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.bson.Document;

import java.util.*;

@RestController
@RequestMapping("/api/db")
@RequiredArgsConstructor
public class DbInspectController {

	 @Autowired
	    private JdbcTemplate jdbcTemplate;
	    
    @Autowired
    private MongoTemplate mongoTemplate;

    // PostgreSQL 테이블 목록
    @GetMapping("/pg/tables")
    public ResponseEntity<?> listPostgresTables() {
        String sql = """
            SELECT table_schema, table_name
            FROM information_schema.tables
            WHERE table_type='BASE TABLE'
              AND table_schema NOT IN ('pg_catalog','information_schema')
            ORDER BY table_schema, table_name
        """;
        List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql);
        return ResponseEntity.ok(rows);
    }

    // MongoDB 컬렉션 목록
    @GetMapping("/mongo/collections")
    public ResponseEntity<?> listMongoCollections() {
        List<String> collections = new ArrayList<>();
        mongoTemplate.getDb().listCollectionNames().into(collections);
        return ResponseEntity.ok(collections);
    }
}
