// src/main/java/com/mbccurrency/repository/MongoInspectRepository.java
package com.mbccurrency.repository.mongo;

import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MongoRepository {

    private final MongoTemplate mongo;

    public MongoRepository(MongoTemplate mongo) {
        this.mongo = mongo;
    }

    public List<String> listCollections() {
        List<String> names = new ArrayList<>();
        mongo.getDb().listCollectionNames().into(names);
        return names;
    }

    public Map<String, Object> ping() {
        Document res = mongo.getDb().runCommand(new Document("ping", 1));
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("ok", Double.valueOf(1.0).equals(res.getDouble("ok")));
        out.put("db", mongo.getDb().getName());
        return out;
    }

    public List<Map<String, Object>> sample(String collection, int limit) {
        if (!collection.matches("[a-zA-Z0-9._-]+")) {
            throw new IllegalArgumentException("invalid collection name");
        }
        limit = Math.max(1, Math.min(limit, 200));
        MongoCollection<Document> col = mongo.getDb().getCollection(collection);
        List<Document> docs = col.find().limit(limit).into(new ArrayList<>());
        // Document -> Map 직렬화
        List<Map<String, Object>> mapped = new ArrayList<>();
        for (Document d : docs) mapped.add(new LinkedHashMap<>(d));
        return mapped;
    }
}
