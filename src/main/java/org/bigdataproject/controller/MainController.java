package org.bigdataproject.controller;

import org.bigdataproject.dto.OHLCRecordDto;
import org.bigdataproject.entity.OHLCRecord;
import org.bigdataproject.mapper.OHLCMapper;
import org.bigdataproject.service.OHLCRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {
    @Autowired
    private OHLCRecordService service;
    @GetMapping("/tesla-data")
    public ResponseEntity<List<OHLCRecordDto>> sayHello() {
        List<OHLCRecordDto> recordsDto = service.findAll();

        return new ResponseEntity<>(recordsDto, HttpStatus.OK);
    }
}
