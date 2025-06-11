package org.bigdataproject.mapper;

import org.bigdataproject.dto.OHLCRecordDto;
import org.bigdataproject.entity.OHLCRecord;
import org.springframework.stereotype.Component;

@Component
public class OHLCMapper {
    public static OHLCRecordDto toOHLCRecordDto(OHLCRecord record) {
        OHLCRecordDto dto = new OHLCRecordDto();
        dto.setDate(record.getDate());
        dto.setOpen(record.getOpen());
        dto.setClose(record.getClose());
        dto.setVolume(record.getVolume());
        dto.setHigh(record.getHigh());
        dto.setLow(record.getLow());
        return dto;
    }
}
