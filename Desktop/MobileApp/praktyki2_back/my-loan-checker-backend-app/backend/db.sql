CREATE TABLE users_login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    vorname VARCHAR(100) NOT NULL,
    pesel VARCHAR(100) NOT NULL,
    login_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (login_id) REFERENCES users_login(id)
);

CREATE TABLE friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);

CREATE TABLE pending_friend_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    friend_list_id INT DEFAULT NULL,
    accepted BOOLEAN DEFAULT 0 NOT NULL, 
    pending BOOLEAN DEFAULT 1 NOT NULL, 
    FOREIGN KEY (friend_list_id) REFERENCES friends(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);

CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lender_id INT NOT NULL,
    borrower_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    status ENUM('pending', 'paid', 'unpaid') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lender_id) REFERENCES users(id),
    FOREIGN KEY (borrower_id) REFERENCES users(id)
);

DROP TABLE pending_friend_requests;
DROP TABLE friends;
DROP TABLE loans;
DROP TABLE users;
DROP TABLE users_login;