import { Fragment, useState } from 'react'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon, HomeIcon, MapIcon, ViewListIcon, SearchIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import PropertyCard from './PropertyCard';
import PropertyList from './PropertyList';
import SearchComponent from './SearchComponent';
import {filterData, subCategories, sortOptions, getFilterValues} from '../utils/filterData'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ListLayout({ 
  properties,
 }) {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewPort, setViewPort] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const filteredProperties = properties?.filter((property) => {
    const searchContent = property.title
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayProperties exist, display it if no searchValue is specified
  const displayProperties =
  properties.length > 0 && !searchValue
      ? properties
      : filteredProperties

  const handleClick = () => {
    setViewPort(!viewPort);
  }

  const searchProperties = filterValues => {
    const path = router.pathname
    const { query } = router

    const values = getFilterValues(filterValues)

    values.forEach(item => {
        if (item.value && filterValues?.[item.name]) {
            query[item.name] = item.value
        }
    })

    router.push({ pathname: path, query: query })
}

  return (
    <>

      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <div className="relative my-5 mx-2 max-w-lg">
                  <input
                    aria-label="Search properties"
                    type="text"
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search properties"
                    className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition duration-150 ease-in-out focus:border-0 focus:text-primary-500 focus:outline-none focus:ring  focus:ring-primary-500"
                  />
                  <SearchIcon className="absolute right-3 top-3 h-5 w-5"/>
                </div>
               
                <div className="grid grid-cols-1">
                  {filterData.map((filter) => (
                    <div key={filter.queryName} className="mx-2 my-1">
                        <select
                          onChange={(e) => searchProperties({
                              [filter.queryName]: e.target.value,
                          })}
                          className="block w-full rounded-lg border mt-4 border-gray-300 bg-gray-50 p-2.5 text-sm font-bold text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between  pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-50">Properties</h1>

              <div className="flex items-center"> 
                  {viewPort ?
                    (
                      <button type="button" onClick={handleClick} className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View grid</span>
                        <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                      </button>
                    )
                    :
                    (
                      <button type="button" onClick={handleClick} className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">View list</span>
                      <ViewListIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                    )
                  }
                  <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                    <MapIcon className="w-5 h-5" aria-hidden="true"/>
                  </button>
                  <button
                    type="button"
                    className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FilterIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
              </div>      
          </div>  

          <section aria-labelledby="properties-heading" className="pb-24">
            <h2 id="properties-heading" className="sr-only">
              Properties
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 ">
              {/* Filters */}
              <div className='hidden lg:block'>
                  <div className="relative my-5 mx-2 max-w-lg">
                    <input
                      aria-label="Search properties"
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search properties"
                      className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition duration-150 ease-in-out focus:border-0 focus:text-primary-500 focus:outline-none focus:ring  focus:ring-primary-500"
                    />
                  
                    <SearchIcon className="absolute right-3 top-3 h-5 w-5"/>
                  </div>
                  <div className="grid grid-cols-1">
                  {filterData.map((filter) => (
                    <div key={filter.queryName} className="mx-2 my-1">
                      <select
                        onChange={(e) => searchProperties({
                            [filter.queryName]: e.target.value,
                        })}
                        className="block w-full rounded-lg border mt-4 border-gray-300 bg-gray-50 p-2.5 text-sm font-bold text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
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
              </div>

              {/* property grid */}
              <div className="lg:col-span-3">
                  <div className="rounded-lg h-96 lg:h-full">
                  {!displayProperties?.length && 'No properties found.'}

                  {viewPort ? 
                    (
                      <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2">
                      {displayProperties?.map((property, index) => {
                        return <PropertyCard key={index} property={property} />
                      })}
                    </div>
                    )
                    :
                    (
                      <div className="">
                        {displayProperties?.map((property, index) => {
                          return <PropertyList key={index} property={property} />
                        })}
                      </div>
                    )
                  }
                  </div>
                </div>
            </div>
          </section>
        </main>
    </>
  )
}


