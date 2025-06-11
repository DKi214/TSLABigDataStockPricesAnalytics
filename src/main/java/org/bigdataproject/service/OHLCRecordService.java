package org.bigdataproject.service;

import org.bigdataproject.entity.OHLCRecord;
import org.bigdataproject.repository.OHLCRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OHLCRecordService {
    private OHLCRecordRepository repository;

    @Autowired
    public OHLCRecordService(OHLCRecordRepository repository) {
        this.repository = repository;
    }

    public List<OHLCRecord> findAll() {
        return repository.findAll();
    }
}
