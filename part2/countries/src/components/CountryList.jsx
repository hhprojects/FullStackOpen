import {useState} from 'react'
import Country from './Country'

const CountryList = ({countryList, setCountryList}) => {

    if(countryList.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }else if(countryList.length === 1){
        return (
            <Country country={countryList[0]} />
        )
    }else{
        const [countryObject, setCountryObject] = useState(null)
        const handleShowClick = country => {
            console.log(country)
            setCountryObject(country)
        }

        return (
            <div>
                <ul>
                    {countryList.map((country, i) => <li key={i}>{country.name.common} <button onClick={() => handleShowClick(country)}>show</button></li>)}
                </ul>
                <Country country={countryObject} />
            </div>
        )
    }

}

export default CountryList