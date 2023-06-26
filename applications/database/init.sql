CREATE TABLE accounts (
    accountId INTEGER AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    PRIMARY KEY (accountId)
);

CREATE TABLE posts (
    postId INTEGER AUTO_INCREMENT,
    accountId INTEGER,
    title VARCHAR(50),
    content VARCHAR(50),
    PRIMARY KEY (postId),
    FOREIGN KEY (accountId) REFERENCES accounts(accountId)
);

CREATE TABLE comments (
    commentId INTEGER AUTO_INCREMENT,
    postId INTEGER,
    accountId INTEGER,
    comment VARCHAR(200),
    PRIMARY KEY (commentId),
    FOREIGN KEY (postId) REFERENCES posts(postId),
    FOREIGN KEY (accountId) REFERENCES accounts(accountId)
);

INSERT INTO accounts (username, password) VALUES ('Andralodo', '123456');
INSERT INTO accounts (username, password) VALUES ('Kareth', '123456');

INSERT INTO posts (accountId, title, content) VALUES (1, 'Första Posten', 'Får se om det här funkar');
INSERT INTO posts (accountId, title, content) VALUES (2, 'Andra Posten', 'Fixade profile page');

INSERT INTO comments (postId, accountId, comment) VALUES (1, 2, 'aa men det tror jag det ska göra');
INSERT INTO comments (postId, accountId, comment) VALUES (2, 1, 'Ey schysst sida fan');
