package org.johan.csg.attendance.register.api.mapper;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.johan.csg.attendance.register.api.db.entity.ClassRoomEntity;
import org.johan.csg.attendance.register.api.db.entity.HolidayEntity;
import org.johan.csg.attendance.register.api.db.entity.ReligionEntity;
import org.johan.csg.attendance.register.api.db.entity.TermEntity;
import org.johan.csg.attendance.register.api.model.ClassRoom;
import org.johan.csg.attendance.register.api.model.Holiday;
import org.johan.csg.attendance.register.api.model.Religion;
import org.johan.csg.attendance.register.api.model.Term;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public abstract class LookupMapper {

    public static LookupMapper INSTANCE = Mappers.getMapper(LookupMapper.class);

    @Mapping(target = "info", ignore = true)
    public abstract Holiday mapHoliday(HolidayEntity source);

    public abstract List<Holiday> mapHolidays(List<HolidayEntity> source);

    @AfterMapping
    protected void withHolidayData(HolidayEntity source, @MappingTarget Holiday target) {
        target.setInfo(DateFormatUtils.format(java.sql.Date.valueOf(source.getHolidayDate()), "E, dd MMMM yyyy"));
    }

    public abstract Religion mapReligion(ReligionEntity source);

    public abstract List<Religion> mapReligions(List<ReligionEntity> source);

    @Mapping(target = "info", ignore = true)
    public abstract Term mapTerm(TermEntity source);

    public abstract List<Term> mapTerms(List<TermEntity> source);

    @AfterMapping
    protected void withTermData(TermEntity source, @MappingTarget Term target) {

        target.setInfo(DateFormatUtils.format(java.sql.Date.valueOf(source.getTermStartDate()), "E, dd MMMM yyyy")
                + " - " +
                DateFormatUtils.format(java.sql.Date.valueOf(target.getTermEndDate()), "E, dd MMMM yyyy")
        );
    }

    @Mapping(target = "info", ignore = true)
    public abstract ClassRoom mapClassRoom(ClassRoomEntity source);

    public abstract List<ClassRoom> mapClassRooms(List<ClassRoomEntity> source);

    @AfterMapping
    protected void withTermData(ClassRoomEntity source, @MappingTarget ClassRoom target) {
        target.setInfo("Grade " + source.getGrade());
    }

}




