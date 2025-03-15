import React, {useEffect, useState} from 'react'
import ChatComponent from './ChatComponent'
import JoinChat from './JoinChat'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  const [backEndData, setBackEndData] = useState([{}])
  const [weatherObject, setWeatherObject] = useState({})

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackEndData(data)
      }
    ) 
  }, []) 


  function weatherAPI(cityName) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},uk&APPID=ddb9f31b11067335a281a41f5e57514e`;
    // console.log(URL)
    
    fetch(URL)
    .then((data) => {
        // console.log(data)
        return data.json()
        // console.log('DEBUG:: ', data.body)
    })
    .then((responseData) => {
        console.log('DEBUG:: ', responseData)

        if (responseData?.cod === '404') {
          setWeatherObject({'description' : responseData?.message})
        } else {
          setWeatherObject(responseData.weather[0])
        }
    })
  }

  function ourBackEnd(cityName) {
    fetch(`/weatherInCity/${cityName}`)
    .then(
      response => response.json()
    ).then((responseData) => {
      if (responseData?.cod === '404') {
        setWeatherObject({'description' : responseData?.message})
      } else {
        setWeatherObject(responseData)
      }
      }
    ) 
   
  }

  function onChange(event) {
    // console.log(event.target.value)

    const cityName = event.target.value
    // weatherAPI(cityName)
    ourBackEnd(cityName)
    // fetch(`/weatherInCity/${cityName}`)
    // .then((response) => {
    //   console.log("FROM BACK END : ", response)
    // }) 
  }

  return (
    <div>

        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JoinChat />} />
            <Route path="/joinChat" element={<ChatComponent />}>

            {/* <Route path='/joinChat' render={(props) => <ChatComponent {...props} />} /> */}

            </Route>
          </Routes>
        </BrowserRouter>

        {/* <input
          type="text"
          placeholder="city name"
          onChange={onChange}
        />

        {(weatherObject === undefined ? (
          <p> We could not find the weather object from the server! </p>
        ) : (
          <div>
            <p> {weatherObject.main} </p>
            <p> {weatherObject.description} </p>
          </div>
        ))} */}

      {/* {(typeof backEndData.users === 'undefined') ? (
        <p> Loading ... </p>
      ): (
        backEndData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )} 
       */}
    </div>
  )
}

export default App;
