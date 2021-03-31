DROP TABLE IF EXISTS debts;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS savings;
DROP TABLE IF EXISTS recurring;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  password VARCHAR(100),
  profile_pic TEXT
);

CREATE TABLE budget (
  user_id INTEGER REFERENCES users(user_id),
  order INTEGER,
  category VARCHAR(15),
  amount INTEGER
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  date TIMESTAMP
);

CREATE TABLE recurring (
  recurring_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  pay_date DATE
);

CREATE TABLE savings (
  savings_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  overall INTEGER
);

CREATE TABLE goals (
  goal_id SERIAL PRIMARY KEY,
  savings_id INTEGER REFERENCES savings(savings_id),
  goal_amount INTEGER,
  saved_amount INTEGER,
  name VARCHAR(20),
  goal_date DATE,
  monthly_amount INTEGER
);

CREATE TABLE debts (
  debt_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  total INTEGER,
  monthly INTEGER,
  paid INTEGER,
  due DATE
);

SELECT * FROM users;
SELECT * FROM budget;
SELECT * FROM expenses;
SELECT * FROM recurring;
SELECT * FROM savings;
SELECT * FROM goals;
SELECT * FROM debts;