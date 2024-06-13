import axios from 'axios'
import '../src/styles/App.css'
import { useEffect,useState } from 'react'
import ClimaCard from './ClimaCard'
import Loading from './Loading'
function App() {

 const [clima, setClima] = useState(null) 

 const [loading, setLoading] = useState(true)

 const [image, setImage] = useState(null)

 const loadInfo = async(ciudad ="Sevilla") =>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_CLIMA}&key=${import.meta.env.VITE_APP_KEY}&q=${ciudad}`)

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

    console.log(imagenApi)
  } catch (error) {
    console.log(error)
    setLoading(false)
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
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh', 
  display: 'flex',
  minwidth: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
};

  return (
    <>
    <div className='app-container' style={style}> 
    {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center' ,textAlign:'center' }} > 
      <Loading /> 
      </div>// Show the spinner while loading
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ClimaCard infoClima={clima} imageUrl={image} />
      </div>

    )}
    </div>
           
  </>
);
}

export default App
