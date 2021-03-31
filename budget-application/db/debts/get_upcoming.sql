SELECT * FROM debts
WHERE user_id = $1 ORDER BY due LIMIT 1;