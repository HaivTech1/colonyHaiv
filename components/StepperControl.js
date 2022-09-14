import React from 'react'

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className='conatainer flex justify-end space-x-8 mt-4 mb-8'>
      {/*back button*/}

      <button onClick={() => handleClick()} 
        className={`button ${currentStep === 1 ? "opacity-500 cursor-not-allowed" : ""}`}>
        Back
      </button>
  
      {/*next button*/}
      <button onClick={() => handleClick("next")} className='button'>
        {currentStep === steps.length -1 ? "Confirm" : "Proceed"}
      </button>

    </div>
  )
}

export default StepperControl
