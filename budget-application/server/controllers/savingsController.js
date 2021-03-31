module.exports = {
  updateSavings: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {overall} = req.params
    
    await db.savings.update_savings([overall, user_id])
    
    res.sendStatus(200)
  },

  getSavings: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const [overall] = await db.savings.get_savings([user_id])

    res.status(200).send(overall)
  },

  getGoals: async (req, res) => {
    const db = req.app.get('db')
    // const {savings_id} = req.session.user
    const savings_id = 1

    const goals = await db.savings.get_goals([savings_id])

    res.status(200).send(goals)
  },

  newGoal: async (req, res) => {
    const db = req.app.get('db')
    // const {savings_id} = req.session.user
    const savings_id = 1
    const {name, goal_date, monthly_amount, goal_amount} = req.body

    await db.savings.new_goal([savings_id, name, goal_date, monthly_amount, goal_amount])

    res.sendStatus(200)
  },

  updateGoal: async (req, res) => {
    const db = req.app.get('db')
    const {goal_id, saved_amount, name, goal_date, monthly_amount, goal_amount} = req.body

    const [goal] = await db.savings.update_goal([goal_id, saved_amount, name, goal_date, monthly_amount, goal_amount])

    res.status(200).send(goal)
  },

  getPriority: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    const [goal] = await db.savings.get_priority([+id])

    res.status(200).send(goal)
  }
}