import React ,{useState} from 'react'
import '../src/styles/FormStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ClimaForm = ({changeCity}) => {

    const [city, setCity] = useState("")

    const handleChange = (e) =>{
        setCity(e.target.value)

    } 

    const handleSubmit =(e) =>{
        e.preventDefault()
        if (city.trim() === "") {
             alert("Debe ingresar una ciudad")
            return
        }
       
        changeCity(city)
        setCity("")

    }

  return (
    <> 
    <form className='formStyles' onSubmit={handleSubmit}  >
    <div className="input-group">
          <input 
            placeholder='Ingrese una ciudad' 
            type="text" 
            name="city"
            value={city} 
            onChange={handleChange}
          />
          <button type="submit">🔍</button>
        </div>
       
    </form> 
       
    </>
    )
}

export default ClimaForm