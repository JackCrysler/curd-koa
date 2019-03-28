CREATE TABLE IF NOT EXISTS `manager`(
   `user_id` VARCHAR(100) NOT NULL,
   `user_name` VARCHAR(100) NOT NULL,
   `user_pwd` VARCHAR(100) NOT NULL,
   `create_date` DATETIME NOT NULL,
   `role` VARCHAR(100) NOT NULL,
   `roletype` INT NOT NULL,
   PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;