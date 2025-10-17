package com.mbccurrency.repository.mongo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.mbccurrency.entity.NewsSentiment;

public interface NewsSentimentRepository extends MongoRepository<NewsSentiment, String> {

    List<NewsSentiment> findByDateBetween(Date start, Date end);

    Optional<NewsSentiment> findByDate(Date date);

    Optional<NewsSentiment> findTopByOrderByDateDesc();

    List<NewsSentiment> findAllByOrderByDateDesc(Pageable pageable);

    // ✅ 비어있지 않은 문서만 조회 (Pageable로 정렬 및 개수 제한)
    @Query(value = "{ 'value': { $ne: null }, 'item_code': { $ne: null }, 'item_name': { $ne: null } }")
    List<NewsSentiment> findLatestNonNull(Pageable pageable);
}
