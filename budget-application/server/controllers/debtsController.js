module.exports = {
  newDebt: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {name, total, monthly, due} = req.body

    await db.debts.new_debt([user_id, name, total, monthly, due])

    res.sendStatus(200)
  },

  getDebts: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    
    const debts = await db.debts.get_debts(user_id)

    res.status(200).send(debts)
  },

  updateDebts: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {total, name, monthly, paid, due} = req.body

    const [debt] = await db.debts.update_debts([+id, total, name, monthly, paid, due])

    res.status(200).send(debt)
  },

  getTotal: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    
    let [debt] = await db.debts.get_total([user_id])

    if(debt.sum === null){
      debt.sum = 0
    }

    debt.sum = parseInt(debt.sum)

    res.status(200).send(debt)
  },

  getUpcoming: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const [upcoming] = await db.debts.get_upcoming([user_id])

    res.status(200).send(upcoming)
  }
}