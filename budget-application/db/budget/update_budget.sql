UPDATE budget
SET amount = $1
WHERE user_id = $2 AND category = $3;