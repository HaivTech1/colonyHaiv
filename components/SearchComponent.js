import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { filterData, getFilterValues } from '../utils/filterData'

const SearchComponent = () => {
  const [filters, setFilters] = useState(filterData)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const searchProperties = (filterValues) => {
    const path = router.pathname
    const { query } = router

    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query })
  }

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true)
        const data = await api().get(`/api/property?search=${searchTerm}`)
        console.log(data.data)
        setLoading(false)
        setLocationData(data.data?.hits)
      }

      fetchData()
    }
  }, [searchTerm])

  return (
    <div className="grid grid-cols-1">
      {filters.map((filter) => (
        <div key={filter.queryName} className="mx-2 my-1">
          <select
            onChange={(e) =>
              searchProperties({
                [filter.queryName]: e.target.value,
              })
            }
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option>{filter.placeholder}</option>
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      ))}
    </div>
  )
}

export default SearchComponent
