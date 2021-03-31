SELECT SUM(total) FROM debts
WHERE user_id = $1;