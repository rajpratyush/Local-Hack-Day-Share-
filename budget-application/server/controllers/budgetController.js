module.exports = {
  getBudget: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    let budget = await db.budget.get_budget([user_id])

    res.status(200).send(budget)
  },

  updateBudget: async (req, res) => {
    const db = req.app.get('db')
    const updated = req.body
    // const {user_id} = req.session.user
    const user_id = 1

    for(let key in updated){
      await db.budget.update_budget([updated[key], user_id, key])
    }

    res.sendStatus(200)
  },

  newBudget: async (req, res) => {
    const db = req.app.get('db')
    const {category, amount} = req.body
    //const {user_id} = req.session.user
    const user_id = 1

    await db.budget.new_budget([user_id, category, amount])

    res.sendStatus(200)
  }
}