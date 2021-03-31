const moment = require('moment')

module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    const expenses = await db.expenses.get_expenses([user_id])

    res.status(200).send(expenses)
  },
  
  newExpense: async (req, res) => {
    const db = req.app.get('db')
    const {name, category, amount} = req.body
    // const {user_id} = req.session.user
    const user_id = 1
    const date = moment().format()

    await db.expenses.new_expense([user_id, name, category, amount, date])
  
    res.sendStatus(200)
  },

  updateExpenses: async (req, res) => {
    const db = req.app.get('db')
    const body = req.body
    console.log(body)
    
    for(let i = 0; i < body.length; i++){
      const {name, date, amount, category, expense_id} = body[i]

      await db.expenses.update_expense([name, date, amount, category, expense_id])
    }

    res.sendStatus(200)
  },

  deleteExpense: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    
    await db.expenses.delete_expense([+id])
    
    res.sendStatus(200)
  },

  getRecent: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1

    let recents = await db.expenses.get_recent([+user_id])

    res.status(200).send(recents)
  },

  getCurrent: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    let current = []
  
    let startMonth = moment().startOf('month').format()
    let endMonth = moment().endOf('month').format()

    let [response] = await db.expenses.get_current([user_id, startMonth, endMonth])
    if(response.some === null){
      response.sum = 0
    }
    current.push({category: 'Overall', amount: +response.sum})
    
    let monthly = await db.expenses.get_monthly_expense([user_id, startMonth, endMonth])
    
    for(let i = 0; i < monthly.length; i++){
      monthly[i].amount = +monthly[i].sum
      delete monthly[i].sum
      current.push(monthly[i])
    }

    res.status(200).send(current)
  },

  filterExpenses: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const user_id = 1
    const {name, category, end, start, low, high} = req.body
    const filters = req.body

    const expenses = await db.expenses.get_expenses([user_id])

    const filtered = expenses.filter(expense => {
      if(name){
        return expense.name == name
      } else if(category){
        return expense.category == category
      } else if(start){
        console.log(start)
        return moment(expense.date).format('MM/DD/YY') >= moment(start).format('MM/DD/YY')
      } else if(end){
        console.log(end)
        return moment(expense.date).format('MM/DD/YY') <= moment(end).formant('MM/DD/YY')
      } else if(low){
        return expense.amount >= low
      } else if(high){
        return expense.amount <= high
      }
    })
      
    res.status(200).send({filtered, filters})
  }
}