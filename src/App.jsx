import axios from 'axios'
import '../src/styles/App.css'
import { useEffect, useState } from 'react'
import ClimaCard from './ClimaCard'
import Loading from './Loading'
import ClimaForm from './ClimaForm'
import { Carousel } from 'react-bootstrap'
function App() {

  const [clima, setClima] = useState(null)

  const [loading, setLoading] = useState(true)

  const [image, setImage] = useState(null)

  const loadInfo = async (ciudad = "Barcelona") => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_CLIMA_API_URL}&key=${import.meta.env.VITE_API_KEY_WEATHER}&q=${ciudad}&days=3&lang=es`)

      const data = response.data
      setClima(data)

      console.log(data)
      console.log(response)

      const imagenApi = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: ciudad, client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, per_page: 1 }
      });
      const imageUrl = imagenApi.data.results[0]?.urls?.regular;
      setImage(imageUrl);
      setLoading(false)


    } catch (error) {
      console.log(error)
      setLoading(true)
      return alert("ingrese una ciudad valida")


    }
  }

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    if (clima) {
      const ciudad = clima.location.name; // Obtener el nombre de la ciudad del objeto 'clima'
      if (ciudad !== clima.location.name) {
        loadInfo(ciudad); // Volver a cargar la información con la nueva ciudad
      }
    }
  }, [clima]);

  const style = {
    backgroundImage: `url(${image})`,
  }
  const handleChange = (ciudad) => {
    loadInfo(ciudad)
  }


  return (
    <>

      <div className='app-container' style={style}>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }} >
            <Loading />
          </div>// Show the spinner while loading
        ) : (


          <div> <ClimaForm changeCity={handleChange} ></ClimaForm>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>


              {
                clima ? (
                  <Carousel  interval={100000}>

                   { clima?.forecast?.forecastday.map((forecastItem , index) => (

                    <Carousel.Item  key={index}>
                      <ClimaCard key={index} infoClima={{ location: clima.location, current: clima.current, forecastItem }} />
                    </Carousel.Item> ))}
                    </Carousel>   ): ""
                }

                  </div>
            </div>
          
        )}
          </div>
    </>
      );
}

      export default App
