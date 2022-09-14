import React from 'react'
import CheckBox from "../form/Checkbox";

const Agreement = () => {

  const handleClick = (e) => {
      const { checked, value } = e.currentTarget;
      alert(value);
  }

  return (
    <div className='mt-6'>
      <div>
        <div className="mt-4">
          <h1 className="font-bold text-center text-xl mt-4 mb-2">Property Management Agreement</h1>
          <p>
            lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem 
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem 
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem 
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          </p>
        </div>


        <div className="mt-4">
          <h1 className="font-bold text-center text-xl mt-4 mb-2">Lease Agreement</h1>
          <p>
            lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem 
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem 
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem 
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          </p>
        </div>

        <div className="mt-4 flex justify-content items-center"> 
            <CheckBox onChange={handleClick} /> <span>Do you agree to the agreement listed above?</span>
        </div>

      </div>
    </div>
  )
}

export default Agreement
