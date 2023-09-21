CREATE TABLE IF NOT EXISTS user_image (
    id INT NOT NULL AUTO_INCREMENT,
    uid INT references users(id),
    img_src CHAR(255) COMMENT '图片地址',
    img_type CHAR(20) COMMENT '图片类型',
    create_date DATETIME COMMENT '注册时间',
    PRIMARY KEY (id)
);