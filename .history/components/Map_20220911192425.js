import { getCenter } from 'geolib'
import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

function Map({ properties }) {
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = properties.map(result => ({
        longitude: result.attribute.longitude,
        latitude: result.attribute.latitude,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph"
            mapboxAccessToken={process.env.MAPBOXGL_KEY}
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}>
            {properties.map(result => (
                <div key={result.id}>
                    <Marker
                        longitude={result.attribute.longitude}
                        latitude={result.attribute.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}>
                        <p
                            role="img"
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin">
                            here
                        </p>
                    </Marker>

                    {/* popup */}
                    {selectedLocation.lng === result.attribute.longitude ? (
                        <Popup
                            longitude={result.lng}
                            latitude={result.lat}
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}>
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map

<div className="flex justify-between items-center space-x-5">
    <div
        className="w-full cursor-pointer flex-1"
        onClick={() => router.push('/property/[slug]', `/property/${slug}`)}
    >
        {image ? (
        <Image
            src={image[0]}
            alt={title}
            width="250"
            height="200"
            className="rounded-2xl object-cover"
            placeholder="blur"
            blurDataURL="/static/images/SVG-placeholder.png"
        />
        ) : null}
    </div>

    <div className="flex-3">
        
    </div>
</div>




          <div class="w-full md:w-1/4 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:my-3 rounded-md shadow-lg shadow-gray-600 md:relative md:z-50 md:flex md:flex-col">
              <div class="w-full flex-grow">
                  <h2 class="text-center font-bold uppercase mb-4">TEAM</h2>
                  <h3 class="text-center font-bold text-3xl md:text-4xl mb-2">$15<span class="text-lg">/mo</span></h3>
                  <p class="text-center font-bold mb-5">
                      <a href="#" class="hover:underline hover:text-gray-700 transition-all transform hover:scale-110 inline-block">Read more<i class="mdi mdi-arrow-right-thick ml-1"></i></a>
                  </p>
                  <ul class="text-sm px-5 mb-8">
                      <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Lorem ipsum</li>
                      <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Dolor sit amet</li>
                      <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Consectetur</li>
                      <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Adipisicing</li>
                      <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Elit repellat</li>
                  </ul>
              </div>
              <div class="w-full">
                  <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
              </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center border-1 border-primary-500">
                  <div className="rounded-lg  p-5">
                    {!amenities ? 'No amenities attached' : ''}
  
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index}>
                          <Status name={amenity} status={true} />
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div className="rounded-lg  p-5">
                    {!furnish ? 'No furnishing attached' : ''}
  
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {furnish.map((amenity, index) => (
                        <div key={index}>
                          <Status name={amenity} status={true} />
                        </div>
                      ))}
                    </div>
              </div>
          </div>
  
            <div className="block w-full overflow-x-auto">
                  <h1 className="font-bold text-center text-2xl sm:text-4xl text-primary-500">Payment Method</h1>
              
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {colonyPayment.map(({ name, value }) => (
                      <div key={name} className="mx-8 my-5 flex">
                        <input
                          id={name}
                          type="checkbox"
                          label={value}
                          value={value}
                          checked={colonyPayment.some((val) => val === value)}
                          onChange={handlePaymentClick}
                          hidden
                        />
                        <label
                          className="group flex cursor-pointer select-none items-center space-x-2 text-gray-700"
                          htmlFor={name}
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-700 group-hover:border-primary-700">
                            {currentPaymentMethod === value && (
                              <div className="h-3 w-3 rounded-full bg-primary-500 group-hover:bg-primary-700" />
                            )}
                          </div>
                          <span className="font-bold text-primary-500 group-hover:text-lg">
                            {name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
            </div>
  
            <div className="mt-4 flex justify-center">
              <button onClick={handleBook} className="button w-64">Book Property</button>
            </div>

          </div>
                <div>
                  <Image
                    src="/static/phone.jpg"
                    alt="agreement"
                    width={500}
                    height={500}
                    className="mt-6 p-6 rounded-lg shadow-xl sm:mt-8 sm:w-full sm:h-64 sm:object-cover  object-center"
                    placeholder="blur"
                    blurDataURL="/static/images/SVG-placeholder.png"
                  />
                </div>
      </div>
