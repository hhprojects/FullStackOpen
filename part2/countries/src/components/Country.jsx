const Country = ({country}) => {
    console.log('Country: ', country)

    if(country){
        
        const languagesList = Object.values(country.languages)
    
        console.log('Country Languages:', languagesList)
        return(
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital[0]}</div>
                <div>area {country.area}</div>
                <h3>languages</h3>
                <ul>
                    {languagesList.map(language => <li key={language.id}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        )
    }

}

export default Country