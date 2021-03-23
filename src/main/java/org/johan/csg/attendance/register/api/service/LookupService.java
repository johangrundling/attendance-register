package org.johan.csg.attendance.register.api.service;

import com.fasterxml.classmate.AnnotationOverrides;
import lombok.RequiredArgsConstructor;
import org.johan.csg.attendance.register.api.db.entity.StudentEntity;
import org.johan.csg.attendance.register.api.db.repository.*;
import org.johan.csg.attendance.register.api.mapper.LookupMapper;
import org.johan.csg.attendance.register.api.mapper.StudentMapper;
import org.johan.csg.attendance.register.api.model.*;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class LookupService {

    private final HolidayRepository holidayRepository;;
    private final ReligionRepository religionRepository;
    private final TermRepository termRepository;;
    private final ClassRoomRepository classRoomRepository;

    public RestApiResultHolidays fetchHolidays() {
        return RestApiResultHolidays.builder()
                .holidays(LookupMapper.INSTANCE.mapHolidays(holidayRepository.findAll()))
                .build();
    }

    public RestApiResultReligions fetchReligions() {
        return RestApiResultReligions.builder()
                .religions(LookupMapper.INSTANCE.mapReligions(religionRepository.findAll()))
                .build();
    }

    public RestApiResultClassRooms fetchClassRooms() {
        return RestApiResultClassRooms.builder()
                .classRooms(LookupMapper.INSTANCE.mapClassRooms(classRoomRepository.findAll()))
                .build();
    }

    public RestApiResultTerms fetchTerms() {
        return RestApiResultTerms.builder()
                .terms(LookupMapper.INSTANCE.mapTerms(termRepository.findAll()))
                .build();
    }



}
