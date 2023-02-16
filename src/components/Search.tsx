import React, { useState } from 'react'
import { useLocalData } from 'hooks/useLocalData'
import { useRouter } from 'next/router'
import { GEO_API_URL, geoApiOptions } from 'utils/cities'
import { AsyncPaginate } from 'react-select-async-paginate'
import classes from 'styles/sass/Search.module.scss'

const Search: React.FC = () => {
  const [search, setSearch] = useState(null)
  const { dispatch } = useLocalData()
  const router = useRouter()

  const handleOnChange = async (searchData: any) => {
    dispatch({ type: 'UPDATE_SEARCH_RESULT', payload: searchData })
    // reroute to forecast page
    const [latitude, longitude] = searchData.value.split(' ')
    const route = `forecast?latitude=${latitude}&longitude=${longitude}`
    router.push(route)
  }

  const loadOptions = (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=500000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        return {
          options: json.data.map((city: any) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }
          }),
        }
      })
  }

  return (
    <AsyncPaginate
      id="long-value-select"
      instanceId="long-value-select"
      className={classes.select}
      placeholder="Search for city (min population 500,000)"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}

export default Search
