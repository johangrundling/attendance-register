
CREATE TABLE `class_room` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `grade` smallint(6) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_name_grade` (`name`,`grade`)
);

CREATE TABLE `religion` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `religion_name` varchar(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `religion_name_UNIQUE` (`religion_name`)
) ;

CREATE TABLE `term` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `description` varchar(45) NOT NULL,
    `term_start_date` date NOT NULL,
    `term_end_date` date NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `description_UNIQUE` (`description`)
) ;

CREATE TABLE `student` (
   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `full_name` varchar(45) NOT NULL,
   `nickname` varchar(45) DEFAULT NULL,
   `status` varchar(20) NOT NULL,
   `religion_id` int(11) unsigned DEFAULT NULL,
   `class_room_id` int(11) unsigned NOT NULL,
   `grade` smallint(6) unsigned NULL,
   PRIMARY KEY (`id`),
   CONSTRAINT `fk_student_religion` FOREIGN KEY (`religion_id`) REFERENCES `religion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
   CONSTRAINT `fk_student_class_room` FOREIGN KEY (`class_room_id`) REFERENCES `class_room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

CREATE TABLE `holiday` (
   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `holiday_name` varchar(45) NOT NULL,
   `holiday_date` date NOT NULL,
   `holiday_type` tinyint(1) NOT NULL DEFAULT '0',
   `parent_holiday_id` int(11) unsigned DEFAULT NULL,
   `is_recurring` tinyint(1) NOT NULL DEFAULT '0',
   `religion_id` int(11) unsigned DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `unique_name_date` (`holiday_name`,`holiday_date`),
   CONSTRAINT `fk_holiday_1` FOREIGN KEY (`parent_holiday_id`) REFERENCES `holiday` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
   CONSTRAINT `fk_holiday_religion` FOREIGN KEY (`religion_id`) REFERENCES `religion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

CREATE TABLE `attendance_register` (
   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `class_room_id` int(11) unsigned NOT NULL,
   `register_date` date NOT NULL,
   `term_id` int(11) unsigned DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `unique_class_room_register_date` (`class_room_id`,`register_date`),
   CONSTRAINT `fk_attendance_register_class_room` FOREIGN KEY (`class_room_id`) REFERENCES `class_room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
   CONSTRAINT `fk_attendance_register_term` FOREIGN KEY (`term_id`) REFERENCES `term` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

CREATE TABLE `student_attendance` (
  `student_id` int(11) unsigned NOT NULL,
  `attendance_register_id` int(11) unsigned NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'unknown',
  `information` varchar(100) NULL,
  `updated` datetime NULL,
  PRIMARY KEY (`student_id`,`attendance_register_id`),
  CONSTRAINT `fk_student_attendance_register` FOREIGN KEY (`attendance_register_id`) REFERENCES `attendance_register` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

CREATE TABLE `student_absence` (
   `id` int(11) unsigned NOT NULL,
   `student_id` int(11) unsigned NOT NULL,
   `from_date` date NOT NULL,
   `to_date` date NOT NULL,
   `reason` varchar(45) NOT NULL,
   PRIMARY KEY (`id`),
   CONSTRAINT `fk_student_absence_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

