import React, { useState } from 'react';
import LayoutWrapper  from "../../components/layouts/LayoutWrapper";
import Stepper from './../../components/Stepper';
import StepperControl from './../../components/StepperControl';
import PropertyDetail from './../../components/steps/PropertyDetail';
import Agreement from './../../components/steps/Agreement';
import Furnish from './../../components/steps/Furnish';
import Amenities from './../../components/steps/Amenities';
import Book from '../../components/steps/Book';
import Payment from '../../components/steps/Payment';
import PropertyCard from './../../components/PropertyCard';
import houses from "../../utils/house";
import client from '../../lib/client'
import { PageSEO } from '../../utils/SEO';


const BookProperty = ({property}) => {
    const {title, description} = property

    const [currentStep, setcurrentStep] = useState(1);

    const steps = [
        "Details",
        "Agreement",
        "Furnish",
        "Book",
        "Payment",
    ];

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === 'next' ? newStep++ : newStep--;

        newStep > 0 && newStep <= steps.length && setcurrentStep(newStep);
    }

    const dislayStep = (step, property, handleClick) => {
        switch (step) {
            case 1:
                return <PropertyDetail property={property} />
            case 2:
                return <Agreement />
            case 3:
                return <Furnish />
            case 4:
                return <Book property={property} handleClick={handleClick} />
            case 5:
                return <Payment/>
            default:
                break;
        }
    }
    
  return (
    <LayoutWrapper>
    <PageSEO title={title} description={description} />
        
    <div className=" mx-auto shadow-sl rounded-2xl pb-2 ">
        {/* stepper */}
        <div className='container horizontal mt-5'>
            <Stepper steps={steps} currentStep={currentStep} />

            <div>
                {dislayStep(currentStep, property)}
            </div>
        </div>
    </div>

    {/* Navigation control */}
    <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps}  />
    

    {/*<div>
        <h1 className="text-center font-bold text-gray-900 text-md">You may also like </h1>
        <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-4">
            {houses?.map((property, index) => {
                return <PropertyCard key={index} property={property} />
            })}
        </div>
        </div>*/}
    
    </LayoutWrapper>
  )
}

export default BookProperty


export async function getStaticPaths() {
    const response = await client().get('/v1/properties')
    return {
        fallback: false,
        paths: response.data.data.map(property => ({
            params: { slug: property.slug },
        })),
    }
  }
  
  export async function getStaticProps({ params }) {
    const response = await client().get(`/v1/properties/${params.slug}`)
    
    const property = response.data.properties
  
    return {
        props: {
            property,
        },
    }
  }