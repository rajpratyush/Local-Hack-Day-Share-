import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Loading from '../Loading/Loading'
import './Budget.css'
import BreakdownChart from '../BreakdownChart/BreakdownChart'

function Budget(props){
  const {overall} = props.user
  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('api/expenses/current')
      .then(res => {
        setCurrent(res.data)
      })
      .catch(err => console.log(err))

    axios.get('api/budget')
      .then(res => {
        setBudget(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
      .catch(err => console.log(err))
  }, [])

  const spent = (category) => {
    let amount

    for(let i = 0; i < current.length; i++){
      if(current[i].category === category){
        return amount = (current[i].amount ? current[i].amount : 0)
      }
      amount = 0
    }

    return amount
  }

  const viewSubs = budget.map((budget, i) => {
    const {category, amount} = budget

    return (
      <section className='sub-budget' key={i}>
        <p>{category}:</p>
        <p>${spent(category)} / ${amount}</p>
        <div className='amount-bar'>
          <div className='spent-bar'
            style={{width: `${spent(category)/amount*100}%`}}
          >
          </div>
        </div>
      </section>
    )
  })

  return (
    <section>
      {loading === true ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
        <section className='budget-page'>
          <div className='budget-left'>
            <div className='budget-overall'>
            <div>Monthly Budget: {overall}</div>
            <div>Spent: {spent("Overall")}</div>
          </div>
            <div className='budget-donut-chart'>
              <BreakdownChart data={data}/>
            </div>
          </div>
          <div className='budgets-sub'>
            {viewSubs}
          </div>
        </section>
      )}
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Budget)