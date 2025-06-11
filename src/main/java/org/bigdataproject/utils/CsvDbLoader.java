package org.bigdataproject.utils;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.bigdataproject.entity.OHLCRecord;
import org.bigdataproject.repository.OHLCRecordRepository;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.*;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CsvDbLoader implements ApplicationListener<ApplicationReadyEvent> {

    private OHLCRecordRepository recordRepository;

    @Autowired
    public CsvDbLoader(OHLCRecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }


    public List<OHLCRecord> importCsv(String filePath) {
        if(!isTableAbsentOrEmpty()){
            return null;
        }
        try(InputStream inputStream = getClass().getClassLoader().getResourceAsStream("data/" + filePath)) {
            if (inputStream != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {

                    CsvToBean<CsvBindedOHLCRecord> csvToBean = new CsvToBeanBuilder<CsvBindedOHLCRecord>(reader)
                            .withType(CsvBindedOHLCRecord.class)
                            .withIgnoreLeadingWhiteSpace(true)
                            .withThrowExceptions(false)
                            .build();

                    List<CsvBindedOHLCRecord> records = csvToBean.parse();

                    List<OHLCRecord> stockPrices = records.stream()
                            .filter(csv -> isValid(csv))
                            .map(csv -> {
                                OHLCRecord record = new OHLCRecord();
                                record.setDate(LocalDate.parse(csv.getDate()));
                                record.setOpen(csv.getOpen());
                                record.setHigh(csv.getHigh());
                                record.setLow(csv.getLow());
                                record.setClose(csv.getClose());
                                record.setVolume(csv.getVolume());
                                return record;
                            })
                            .collect(Collectors.toList());
                    return recordRepository.saveAll(stockPrices);
                }catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            else {
                throw new IOException();
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    private boolean isValid(CsvBindedOHLCRecord csv) {
        return csv.getDate() != null
                && csv.getOpen() != null
                && csv.getClose() != null
                && csv.getHigh() != null
                && csv.getLow() != null
                && csv.getVolume() != null;
    }
    public boolean isTableAbsentOrEmpty() {
        try {
            return recordRepository.count() == 0;
        } catch (SQLGrammarException e) {
            return true;
        }
    }
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        importCsv("TSLA.csv");
    }
}
