import {useEffect, useState} from 'react'
import Search from './components/Search'
import CountryList from './components/CountryList'
import countryService from './services/countries'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [filteredCountryList, setFilteredCountryList] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    console.log('effect run, country is now', country)

    console.log('fetching countries...')
    countryService.getAll()
    .then(response => {
      console.log('response data:', response.data)
      setCountryList(response.data)
    })
    
  },[])

  const handleCountryChange = (event) => {
    const countrySearch = event.target.value
    setCountry(countrySearch)

    if (countrySearch){
      const searchCountry = event.target.value
      const filteredCountries = countryList.filter(country => country.name.common.toLowerCase().match(searchCountry.toLowerCase()))
      console.log('Found Country List: ', filteredCountries)
      
      setFilteredCountryList(filteredCountries)
    }else{
      setFilteredCountryList([])
    }
  }

  return(
    <div>
      <Search country={country} handleCountryChange={handleCountryChange}/>
      <CountryList countryList={filteredCountryList} setCountryList={setFilteredCountryList}></CountryList>
    </div>
  )
}

export default App