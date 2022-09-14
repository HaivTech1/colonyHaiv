<div className="rounded-lg px-5 py-4">
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex justify-center items-center space-x-5">
                <div className='flex justify-center items-center space-x-1'>
                  <HomeIcon className="w-7 h-7 text-gray-400" />
                  <span className='font-bold text-md text-primary-500'>Grid</span>
                </div>
                <div className='flex justify-center items-center space-x-1'>
                  <ViewListIcon className="w-7 h-7 text-gray-400" />
                  <span className='font-bold text-md'>List</span>
                </div>
                <div className='flex justify-center items-center space-x-1'>
                  <MapIcon className="w-7 h-7 text-gray-400" />
                  <span className='font-bold text-md'>Map</span>
                </div>
            </div>

            <div className="relative">
                <input
                  aria-label="Search properties"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search houses"
                  className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition duration-150 ease-in-out focus:border-0 focus:text-primary-500 focus:outline-none focus:ring  focus:ring-primary-500"
                />
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
            </div>
          </div>
        </div>