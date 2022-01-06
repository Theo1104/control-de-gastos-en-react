import { useState, useEffect } from 'react'
import Message from './Message'
import Cerrar from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, saveExpenses, editExpense, setEditExpense}) => {

    const[message, setMessage] = useState("")

    const[name, setName] = useState("")
    const[amount, setAmount] = useState("")
    const[category, setCategory] = useState("")
    const[date, setDate] = useState("")
    const[id, setID] = useState("")

    useEffect(() => {
        if(Object.keys(editExpense).length > 0){
            setName(editExpense.name)
            setAmount(editExpense.amount)
            setCategory(editExpense.category)
            setDate(editExpense.date)
            setID(editExpense.id)
          }
    }, [])

    const hideModal = () =>{
        setAnimarModal(false)
        setEditExpense({})

        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()

        if([name, amount, category].includes("")){
            setMessage("Todos los campos son obligatorios")
            setTimeout(() => {
                setMessage("")
            }, 3000)
            return
        }
        saveExpenses({name, amount, category, id, date})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                src={Cerrar} 
                alt="Cerrar" 
                onClick={hideModal}
                />
            </div>

            <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{editExpense.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {message && <Message tipo="error">{message}</Message>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input 
                    id='nombre'
                    type="text"
                    placeholder='Introduce el nombre del Gasto'
                    value={name}
                    onChange={event => setName(event.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad a Gastar</label>
                    <input 
                    id='cantidad'
                    type="number"
                    placeholder='Introduce cuanto se Gastara'
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select 
                    id="categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    >
                        <option value="">Seleccione</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                type="submit" 
                value={editExpense.name ? "Guardar Cambios" : "Añadir Gasto"}
                />
            </form>
        </div>
    )
}

export default Modal
