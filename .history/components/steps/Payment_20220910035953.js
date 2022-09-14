import React from 'react'
import SectionContainer from './../layouts/SectionContainer';

const Payment = ({property}) => {
  const { image, slug, title, purpose, address, price, specifications, excerpt, relationships } = property

  return (
    <SectionContainer>
      <div className="mt-6">
        <div className="mt-6"></div>
      </div>
    </SectionContainer>
  )
}

export default Payment
