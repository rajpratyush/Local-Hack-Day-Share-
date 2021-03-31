SELECT * FROM recurring
WHERE user_id = $1 ORDER BY pay_date ASC;