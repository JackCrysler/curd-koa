CREATE TABLE IF NOT EXISTS `user`(
   `user_id` VARCHAR(100) NOT NULL,
   `user_name` VARCHAR(100) NOT NULL,
   `user_pwd` VARCHAR(100) NOT NULL,
   `nickname` VARCHAR(100),
   `gender` VARCHAR(10),
   `phone_number` INT(100),
   `create_date` DATETIME,
   `email` VARCHAR(100),
   `status` VARCHAR(100),
   `role` VARCHAR(100),
   PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;