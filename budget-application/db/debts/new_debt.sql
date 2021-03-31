INSERT INTO debts (user_id, name, total, monthly, paid, due)
VALUES ($1, $2, $3, $4, 0, $5);