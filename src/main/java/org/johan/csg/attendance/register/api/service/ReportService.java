package org.johan.csg.attendance.register.api.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.johan.csg.attendance.register.api.db.repository.AttendanceRegisterRepository;
import org.johan.csg.attendance.register.api.model.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final AttendanceRegisterRepository attendanceRegisterRepository;

    public InputStreamResource reportDaily(ReportDailyFilter filter) throws DocumentException {

        Document document = new Document(PageSize.A4, 25, 25, 25, 25);

        ByteArrayOutputStream os = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, os);

        document.open();

        Paragraph title = new Paragraph("Daily report",
                FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD, new BaseColor(0, 255, 255)));
        document.add(title);

        java.util.List<StudentAttendanceRecord> attendanceRecords = attendanceRegisterRepository.reportDaily();

        PdfPTable table = new PdfPTable(4);

        attendanceRecords.forEach(sa -> {
            addCell(sa.getClassRoomName(), table);
            addCell(sa.getGrade(), table);
            addCell(sa.getFullName(), table);
            addCell(sa.getStatus(), table);
        });

        document.add(table);
        document.close();

        ByteArrayInputStream is = new ByteArrayInputStream(os.toByteArray());

        return new InputStreamResource(is);
    }

    public InputStreamResource reportTerm(ReportTermFilter filter) throws DocumentException {

        Document document = new Document(PageSize.A4, 25, 25, 25, 25);

        ByteArrayOutputStream os = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, os);

        document.open();

        Paragraph title = new Paragraph("Term Report",
                FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD, new BaseColor(0, 255, 255)));
        document.add(title);

        java.util.List<StudentTermAttendanceRecord> attendanceRecords = attendanceRegisterRepository.reportTerm();

        PdfPTable table = new PdfPTable(7);

        attendanceRecords.forEach(sa -> {
            addCell(sa.getClassRoomName(), table);
            addCell(sa.getGrade(), table);
            addCell(sa.getFullName(), table);
            addCell(sa.getPresentCnt(), table);
            addCell(sa.getAbsentCnt(), table);
            addCell(sa.getExcusedCnt(), table);
            addCell(sa.getUnknownCnt(), table);
        });

        document.add(table);
        document.close();

        ByteArrayInputStream is = new ByteArrayInputStream(os.toByteArray());

        return new InputStreamResource(is);
    }

    private void addCell(String value, PdfPTable table) {
        PdfPCell cell = new PdfPCell(new Phrase(value));
        cell.setFixedHeight(30);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);
    }

    private void addCell(Long value, PdfPTable table) {
        addCell(value.toString(), table);
    }

}
