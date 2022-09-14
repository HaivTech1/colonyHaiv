import client from './client'

export const getProperty = async (pageNo, limit, query) => {
  try {
    const { data } = await client(`/api/v1/properties`)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) {
      return response.data
    }
    return { error: error.message || error }
  }
}

export const searchProperty = async (query) => {
  try {
    const { data } = await client(`/property/search?title=${query}`)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) {
      return response.data
    }
    return { error: error.message || error }
  }
}

export const getSingleProperty = async (slug) => {
  try {
    const { data } = await client(`/property/${slug}`)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) {
      return response.data
    }
    return { error: error.message || error }
  }
}

export const getRelatedProperty = async (propertyId) => {
  try {
    const { data } = await client(`/property/related-properties/${propertyId}`)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) {
      return response.data
    }
    return { error: error.message || error }
  }
}
