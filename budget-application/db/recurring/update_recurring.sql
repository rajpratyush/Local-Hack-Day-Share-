UPDATE recurring
SET name = $1, category = $2, amount = $3, pay_date = $4
WHERE recurring_id = $5;