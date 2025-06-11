package org.bigdataproject.utils;

import com.opencsv.bean.CsvBindByName;

import java.time.LocalDate;

public class CsvBindedOHLCRecord {
    @CsvBindByName(column = "date", required = true)
    private String date;

    @CsvBindByName(column = "Open", required = true)
    private Double open;

    @CsvBindByName(column = "High", required = true)
    private Double high;

    @CsvBindByName(column = "Low", required = true)
    private Double low;

    @CsvBindByName(column = "Close", required = true)
    private Double close;

    @CsvBindByName(column = "Volume", required = true)
    private Long volume;

    public CsvBindedOHLCRecord(String date, Double open, Double high, Double low, Double close, Long volume) {
        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }

    public CsvBindedOHLCRecord() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getOpen() {
        return open;
    }

    public void setOpen(Double open) {
        this.open = open;
    }

    public Double getHigh() {
        return high;
    }

    public void setHigh(Double high) {
        this.high = high;
    }

    public Double getLow() {
        return low;
    }

    public void setLow(Double low) {
        this.low = low;
    }

    public Double getClose() {
        return close;
    }

    public void setClose(Double close) {
        this.close = close;
    }

    public Long getVolume() {
        return volume;
    }

    public void setVolume(Long volume) {
        this.volume = volume;
    }

}
