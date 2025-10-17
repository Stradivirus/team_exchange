package com.mbccurrency.repository.mongo;

import com.mbccurrency.entity.ExportImportPriceIndex;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ExportImportPriceIndexRepository extends MongoRepository<ExportImportPriceIndex, String> {

    List<ExportImportPriceIndex> findByDateBetween(Date start, Date end);

    Optional<ExportImportPriceIndex> findByDate(Date date);

    Optional<ExportImportPriceIndex> findTopByOrderByDateDesc();

    List<ExportImportPriceIndex> findAllByOrderByDateDesc(Pageable pageable);

    // ✅ 비어 있지 않은 문서만 (value, indicator_name, type 존재)
    @Query(value = "{ 'value': { $ne: null }, 'indicator_name': { $ne: null }, 'type': { $ne: null } }")
    List<ExportImportPriceIndex> findLatestNonNull(Pageable pageable);
}
