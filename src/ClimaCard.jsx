import React from 'react'
import '../src/styles/ClimaCardStyles.css'
const ClimaCard = ({ infoClima}) => {


 
  const location = infoClima?.location;
  const current = infoClima?.current;

  const configTime =(localTime)=>{
    const dateObj = new Date(localTime)
    let hours= dateObj.getHours()
    const minutes= dateObj.getMinutes()
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear()

    const amPM = hours >= 12 ? "PM" : "AM" ;
    hours = hours % 12 
    hours = hours ? hours : 12


    const formatedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

    const formatedDate = `${day}/${month}/${year}`

    return {time:formatedTime ,amPM:amPM, date :formatedDate}
  }

  const {time,date,amPM } =configTime(location?.localtime)
  return (
    
      <div className="clima-card">
        <div className="clima-card-content">
          <div className="clima-card-body">

            <h2 className="clima-card-title">{location?.name}, {location?.region}</h2>
            <h1 className="clima-card-text">Country: {location?.country}</h1>
            <p className="clima-card-text">Condition: {current?.condition?.text}  <img src={`http:${current?.condition.icon}`} width='35px' ></img>  
            </p>
            <p className="clima-card-text">Time: {time} {amPM}</p> 
            <p className="clima-card-text">Date: {date}</p>
            <p className="clima-card-text">Temperature: {current?.temp_c}°C , {current?.temp_f}ºF</p>
            <p className="clima-card-text">Latitud: {location?.lat} , Longitud: {location?.lon}</p>

            {/* <button className="clima-card-button">More Info</button> */}
          </div>
        </div>
      </div>
  )
}

export default ClimaCard