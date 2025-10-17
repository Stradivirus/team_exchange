// src/main/java/com/mbccurrency/repository/PgInspectRepository.java
package com.mbccurrency.repository.jpa;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class PgRepository {

    private final JdbcTemplate jdbc;

    public PgRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> listTables() {
        String sql = """
            SELECT table_schema, table_name
            FROM information_schema.tables
            WHERE table_type = 'BASE TABLE'
              AND table_schema NOT IN ('pg_catalog','information_schema')
            ORDER BY table_schema, table_name
        """;
        return jdbc.queryForList(sql);
    }

    public List<Map<String, Object>> describeTable(String schema, String table) {
        String sql = """
            SELECT column_name, data_type, is_nullable, character_maximum_length,
                   numeric_precision, numeric_scale
            FROM information_schema.columns
            WHERE table_schema = ? AND table_name = ?
            ORDER BY ordinal_position
        """;
        return jdbc.queryForList(sql, schema, table);
    }

    public List<Map<String, Object>> sample(String schema, String table, int limit) {
        // 스키마/테이블 이름은 placeholder 바인딩이 안 되므로 간단 검증
        if (!schema.matches("[a-zA-Z0-9_]+") || !table.matches("[a-zA-Z0-9_]+")) {
            throw new IllegalArgumentException("invalid schema/table name");
        }
        limit = Math.max(1, Math.min(limit, 200));
        String sql = String.format("SELECT * FROM %s.%s LIMIT %d", schema, table, limit);
        return jdbc.queryForList(sql);
    }
}
