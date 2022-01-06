import NewBudget from "./NewBudget"
import BudgetControl from "./BudgetControl"

const Header = ({budget, setBudget, isValidBudget, setIsValidBudget, expenses, setExpenses}) => {
    return (
        <header>
            <h1>
           Planificador de Gastos
            </h1>

            {isValidBudget ? (
                <BudgetControl
                    budget={budget}
                    setBudget={setBudget}
                    expenses={expenses}
                    setExpenses={setExpenses}
                    setIsValidBudget={setIsValidBudget}
                />
            ) : (
                <NewBudget
             budget={budget}
             setBudget={setBudget}
             setIsValidBudget={setIsValidBudget}
            />
            )}
        </header>
    )
}

export default Header
