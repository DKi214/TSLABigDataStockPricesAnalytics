package org.bigdataproject.service;

import org.bigdataproject.dto.OHLCRecordDto;
import org.bigdataproject.entity.OHLCRecord;
import org.bigdataproject.mapper.OHLCMapper;
import org.bigdataproject.repository.OHLCRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OHLCRecordService {
    private OHLCRecordRepository repository;

    @Autowired
    public OHLCRecordService(OHLCRecordRepository repository) {
        this.repository = repository;
    }

    public List<OHLCRecordDto> findAll() {
        List<OHLCRecord> records = repository.findAll();
        List<OHLCRecordDto> dtos = new ArrayList<>();
        for (OHLCRecord record : records) {
            dtos.add(OHLCMapper.toOHLCRecordDto(record));
        }
        return dtos;
    }
}
