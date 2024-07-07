import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request
}

const getCountry = name => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request
}

export default {getAll, getCountry}