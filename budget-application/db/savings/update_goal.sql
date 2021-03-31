UPDATE goals
SET saved_amount = $2, name = $3, goal_date = $4, monthly_amount = $5, goal_amount = $6
WHERE goal_id = $1;

SELECT * FROM goals
WHERE goal_id = $1;