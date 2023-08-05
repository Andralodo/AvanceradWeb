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

CREATE TABLE revoked_tokens (
  token VARCHAR(255) PRIMARY KEY
);

INSERT INTO accounts (username, password) VALUES ('Andralodo', '$2b$10$HZZBx4LVV07FMTzwSeAuKOFiBwGWvMt9eVFGUOHSo501pucMpNSGa');
INSERT INTO accounts (username, password) VALUES ('Kareth', '$2b$10$HZZBx4LVV07FMTzwSeAuKOFiBwGWvMt9eVFGUOHSo501pucMpNSGa');

INSERT INTO posts (accountId, title, content) VALUES (1, 'Hello!', 'Hello guys my first post here');
INSERT INTO posts (accountId, title, content) VALUES (2, 'Better then reddit', 'My new favorite site, much better than reddit!');

INSERT INTO comments (postId, accountId, comment) VALUES (1, 2, 'Hi Welcome!');
INSERT INTO comments (postId, accountId, comment) VALUES (2, 1, 'Yeah i know right?');
