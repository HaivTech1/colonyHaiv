import React, { useEffect, useState } from 'react'
import LayoutWrapper from '../components/layouts/LayoutWrapper'
import ListLayout from '../components/ListLayout'
import { PageSEO } from '../utils/SEO'
import houses from "../utils/house";
import { getProperty } from '../lib/property';
import client from '../lib/client';

const Property = ({properties}) => {

  // const [properties, setProperties] = useState([])

  // const fetchProperty = async () => {
  //   await client().get(`/v1/properties`).then((response) =>{
  //     setProperties(response.data.data)
  //   });
  // }

  // useEffect(() => {
  //   fetchProperty()
  // }, [])

      
    return (
      <LayoutWrapper>
        <PageSEO title="Properties" description="properties" />
        <ListLayout title="Properties" properties={properties} />
      </LayoutWrapper>
    )
  }

  export default Property

  export async function getServerSideProps({ query }) {
    const page = query.per_page || 6
    const purpose = query.purpose || ''
    const category = query.category || 'apartment'
    const sort = query.sort || 'desc'
    const minPrice = query.minPrice || 0
    const maxPrice = query.maxPrice || 1000000

    console.log(query);
    const response = await client().get(
        `/v1/properties?purpose=${purpose}&category=${category}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`,
    )
    console.log(response.data.data.length);
    const properties = response.data.data

    return {
        props: {
            properties,
        },
    }
}