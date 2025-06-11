package org.bigdataproject.repository;

import org.bigdataproject.entity.OHLCRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OHLCRecordRepository extends JpaRepository<OHLCRecord, Integer> {
}
