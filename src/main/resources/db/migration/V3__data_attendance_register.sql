
INSERT INTO `attendance_register` (`id`,`class_room_id`,`register_date`,`term_id`)VALUES
(1,1,'2021-03-01', 1),
(2,1,'2021-03-02', 1),
(3,1,'2021-03-03', 1),
(4,1,'2021-03-04', 1),
(5,1,'2021-03-05', 1),
(6,1,'2021-03-08', 1),
(7,1,'2021-03-09', 1),
(8,1,'2021-03-10', 1),
(9,1,'2021-03-11', 1),

(10,1,'2021-03-12', 1),
(11,2,'2021-03-01', 1),
(12,2,'2021-03-02', 1),
(13,2,'2021-03-03', 1),
(14,2,'2021-03-04', 1),
(15,2,'2021-03-05', 1),
(16,2,'2021-03-08', 1),
(17,2,'2021-03-09', 1),
(18,2,'2021-03-10', 1),
(19,2,'2021-03-11', 1),
(20,2,'2021-03-12', 1);



INSERT INTO student_attendance
(student_id,
 attendance_register_id,
 status,
 information,
 updated)
  select s.id, ar.id,
         CASE when  sa.id is not null OR rh.religion_id is not null then 'excused' else 'unknown'  END ,
         IFNULL( rh.holiday_name,sa.reason),
         CURRENT_TIMESTAMP()
                   from attendance_register ar
         join class_room cr on cr.id = ar.class_room_id
         join student s on s.class_room_id = cr.id
         left join religion r on r.id = s.religion_id
         left join holiday rh on rh.religion_id = r.id and holiday_date = ar.register_date
         left join student_absence sa on sa.student_id = s.id and ar.register_date between sa.from_date and sa.to_date;

