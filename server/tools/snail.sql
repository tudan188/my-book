create table books(
    id int not null auto_increment primary KEY,
    isbn VARCHAR(20) not null,
    openId VARCHAR(50) not null,
    rate float,
    title VARCHAR(100) not null,
    image VARCHAR(100),
    alt VARCHAR(100) not null,
    publisher VARCHAR(100) not null,
    summary VARCHAR(1000) not null,
    price VARCHAR(100),
    tags VARCHAR(100),
    author VARCHAR(100)
)
