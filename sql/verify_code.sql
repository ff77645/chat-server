CREATE TABLE IF NOT EXISTS verify_code (
    id INT NOT NULL AUTO_INCREMENT,
    receiver_email CHAR(255) COMMENT '收件箱地址',
    code CHAR(6) COMMENT '验证码',
    send_date CHAR(15) COMMENT '发送时间戳',
    sender_ip CHAR(255) COMMENT '发送者ip',
    action_type CHAR(255) COMMENT '操作类型',
    PRIMARY KEY (id)
);