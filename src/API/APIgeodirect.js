import { API_KEY } from '../constant/config'
export const getGPSCoords = async (city = "Noyon") => {
    const req = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},FR&appid=${API_KEY}`)
    const json = await req.json()
/*      console.log("json",json);
 */     return {
        lon: json[0].lon,
        lat: json[0].lat
    }
}
export const fetchOpenWeather = async (coords) => {
    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&lang=fr&units=metric`)
    const json = await req.json()
    return json
}