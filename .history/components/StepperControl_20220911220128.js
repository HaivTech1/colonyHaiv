import React from 'react'

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className='conatainer flex justify-end space-x-8 mt-4 mb-8'>
      {/*back button*/}

      <button onClick={() => handleClick()} 
        className={`rounded-full px-2 py-2 dark:bg-background-color rounded-lg bg-transparent outline-none border-2 border-primary-400 text-white font-medium active:scale-95 hover:bg-primary-600 hover:border-transparent focus:bg-primary-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none cursor-pointer transition-colors duration-200 ease-in-out ${currentStep === 1 ? "opacity-500 cursor-not-allowed" : ""}`}>
        Back
      </button>
  
      {/*next button*/}
      <button onClick={() => handleClick("next")} className=' rounded-full px-2 py-2 dark:bg-background-color rounded-lg bg-primary-700 outline-none border-2 border-primary-400 text-white font-medium active:scale-95 hover:bg-primary-500 hover:border-transparent focus:bg-primary-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-pointer transition-colors duration-200 ease-in-out'>
        {currentStep === steps.length -1 ? "Confirm" : "Proceed"}
      </button>

    </div>
  )
}

export default StepperControl
