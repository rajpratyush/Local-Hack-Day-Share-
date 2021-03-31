SELECT category, amount FROM budget
WHERE user_id = $1 ORDER BY display ASC;