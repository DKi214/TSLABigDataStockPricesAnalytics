package org.bigdataproject.controller;

import org.bigdataproject.entity.OHLCRecord;
import org.bigdataproject.service.OHLCRecordService;
import org.bigdataproject.utils.CsvDbLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HelloController {
    @Autowired
    private OHLCRecordService service;
    @GetMapping("/records")
    public ResponseEntity<List<OHLCRecord>> sayHello() {
        List<OHLCRecord> records = service.findAll();
        return new ResponseEntity<>(records, HttpStatus.OK);
    }
}
