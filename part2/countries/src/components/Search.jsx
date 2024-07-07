const Search = ({country, handleCountryChange}) => {
    return (
        <div>
            find countries:
            <input value={country} onChange={handleCountryChange} />
        </div>
    )
}

export default Search