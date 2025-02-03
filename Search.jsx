import React from 'react'

function Search({search, setSearch, handleSearch}) {
  return (
    <div className='input'>
      <input type="text" placeholder='Enter City Name' value={search}
      onChange={(event) => setSearch(event.target.value)}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search