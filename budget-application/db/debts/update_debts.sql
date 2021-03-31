UPDATE debts
SET total = $2, name = $3, monthly = $4, paid = $5, due =$6
WHERE debt_id = $1;

SELECT * FROM debts
WHERE debt_id = $1;