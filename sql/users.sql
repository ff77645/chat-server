CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username CHAR(255),--用户名称
    password CHAR(255),--密码
    nickname CHAR(255),--昵称
    gender TINYINT DEFAULT 0,--性别 0未知 1男 2女
    status TINYINT DEFAULT 0, --用户状态：0 正常 1 禁用 2 审核中 3 审核拒绝
    mobile CHAR(20), -- 手机号
    mobile_confirmed TINYINT DEFAULT 0, --手机号验证状态：0 未验证 1 已验证
    email CHAR(255), --邮箱地址
    email_confirmed TINYINT DEFAULT 0,--邮箱验证状态：0 未验证 1 已验证
    avatar CHAR(255),--头像地址
    register_date DATETIME, --注册时间
    register_ip CHAR(255), --注册时 IP 地址
    last_login_date DATETIME, --最后登录时间
    last_login_ip CHAR(255), --最后登录时 IP 地址
    PRIMARY KEY (id)
);