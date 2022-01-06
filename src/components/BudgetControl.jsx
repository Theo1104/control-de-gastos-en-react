import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const BudgetControl = ({budget, expenses, setBudget, setExpenses, setIsValidBudget}) => {

    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0)

        const totalAvailable = budget - totalSpent

        const newPercentage = (( (budget - totalAvailable) / budget ) * 100).toFixed(2)

        setSpent(totalSpent)
        setAvailable(totalAvailable)
        setTimeout(() => {
            setPercentage(newPercentage)
        }, 1000);
    }, [expenses])

    const formatBudget = (amount) =>{
        return amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    const handleReset = () =>{
        const result = confirm("¿Deseas Reiniciar tu presupuesto y gastos?")
        if(result){
            setBudget(0)
            setExpenses([])
            setIsValidBudget(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? "#E70000" : "#4B0082",
                        trailColor: "#F5F5F5",
                        textColor: percentage > 100 ? "#E70000" : "#4B0082"
                    })}
                    value={percentage}
                    text={`${percentage}% Gastado:`}
                />
            </div>
            
            <div className="contenido-presupuesto">
                <button
                className='reset-app'
                type='button'
                onClick={handleReset}
                >Resetear App</button>
                <p>
                    <span>Presupuesto:</span>{formatBudget(budget)}
                </p>
                <p className={`${available < 0 ? "negativo" : ""}`}>
                    <span>Disponible:</span>{formatBudget(available)}
                </p>
                <p>
                    <span>Gastado:</span>{formatBudget(spent)}
                </p>

            </div>
        </div>
    )
}

export default BudgetControl
