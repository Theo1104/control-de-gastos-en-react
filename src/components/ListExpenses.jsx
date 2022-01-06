import React from 'react'
import Expense from './Expense'

const ListExpenses = ({expenses, setEditExpense, removeExpense, filter, filteredExpenses}) => {
    return (
        <div className='listado-gastos contenedor'>
            {filter ? (
                    <>
                        <h2>{filteredExpenses.length ? "Gastos" : "¡No hay gastos en esta categoria!"}</h2>
                        {filteredExpenses.map(expense => (
                        <Expense
                        key={expense.id}
                        expense={expense}
                        setEditExpense={setEditExpense}
                        removeExpense={removeExpense}
                        />
                    ))}
                    </>
                ) : (
                    <>
                    <h2>{expenses.length ? "Gastos" : "¡Añade nuevos Gastos y apareceran aca!"}</h2>
                    {expenses.map(expense => (
                        <Expense
                        key={expense.id}
                        expense={expense}
                        setEditExpense={setEditExpense}
                        removeExpense={removeExpense}
                        />
                    ))}
                    </>
                )
            }
        </div>
    )
}

export default ListExpenses
