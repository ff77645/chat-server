CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username CHAR(255),
    password CHAR(50),
    nickname CHAR(255),
    gender TINYINT DEFAULT 0,
    status TINYINT DEFAULT 0,
    mobile CHAR(20),
    mobile_confirmed TINYINT DEFAULT 0,
    email CHAR(255),
    email_confirmed TINYINT DEFAULT 0,
    avatar CHAR(255),
    register_date DATETIME,
    register_ip CHAR(255),
    last_login_date DATETIME,
    last_login_ip CHAR(255),
    PRIMARY KEY (id)
);