import { useState, useEffect } from 'react'

import Header from './components/Header'
import ListExpenses from './components/ListExpenses'
import Modal from './components/Modal'
import Filter from './components/Filter'
import { generateID } from './helpers'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {
  
  const[expenses, setExpenses] = useState(
    localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : []
    )
  
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  )

  const [isValidBudget, setIsValidBudget] = useState(false)

  const[modal, setModal] = useState(false)
  const[animarModal, setAnimarModal] = useState(false)

  const[editExpense, setEditExpense] = useState({})

  const[filter, setFilter] = useState("")
  const[filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0){
      setModal(true)
  
      setTimeout(() => {
          setAnimarModal(true)
      }, 100)
   }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0)

  }, [budget])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? [])

  }, [expenses])

  useEffect(() => {
    if(filter){
      const filteredExpenses = expenses.filter(expense => expense.category === filter)

      setFilteredExpenses(filteredExpenses)
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0

    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [])

  const handleNewExpense = () =>{
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
        setAnimarModal(true)
    }, 100)
  }

  const saveExpenses = (expense) =>{
    if(expense.id){
      const updatedExpenses = expenses.map(stateExpense => stateExpense.id === expense.id ? expense : stateExpense)
      setExpenses(updatedExpenses)
      setEditExpense({})

    }else{
      expense.id = generateID()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500)
  }

  const removeExpense = (id) =>{
    const updatedExpenses = expenses.filter(expense => expense.id !== id)

    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
      budget={budget}
      setBudget={setBudget}
      isValidBudget={isValidBudget}
      setIsValidBudget={setIsValidBudget}
      expenses={expenses}
      setExpenses={setExpenses}
      />

    {isValidBudget && (
      <>
            <main>
              <Filter
              filter={filter}
              setFilter={setFilter}
              />
              <ListExpenses
              expenses={expenses}
              setEditExpense={setEditExpense}
              removeExpense={removeExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
              />
            </main>
            <div className="nuevo-gasto">
                <img 
                src={IconoNuevoGasto} 
                alt="Icono nuevo gasto" 
                onClick={handleNewExpense}
                />
          </div>
      </>
    )}

      {modal && <Modal
      setModal={setModal}
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}
      saveExpenses={saveExpenses}
      editExpense={editExpense}
      setEditExpense={setEditExpense}
      />}

    </div>
  )
}

export default App
