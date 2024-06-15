import React ,{useState} from 'react'
import '../src/styles/FormStyle.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClimaForm = ({changeCity}) => {

    const [city, setCity] = useState("")

    const handleChange = ({target}) =>{
        setCity(target.value)

    } 

    const handleSubmit =(e) =>{
        e.preventDefault()
        if (city !== "") {
            
       return  changeCity(city)
        }
        if (city === "") {
            return alert("Debe ingresar una city")
        }

    }

  return (
    <> 
    <form className='formStyles' onSubmit={handleSubmit}  >
        <input placeholder='Ingrese una ciudad' type="text" name="city" id="" onChange={handleChange} />
        
       <Button variant="info" className='button-form' onClick={handleSubmit}>Buscar 🧭</Button>
    </form> 
       
    </>
    )
}

export default ClimaForm