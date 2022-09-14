import React from 'react'
import CheckBox from "../form/Checkbox";

const Agreement = () => {

  const handleClick = (e) => {
      const { checked, value } = e.currentTarget;
      alert(value);
  }

  return (
    <div className='mt-6'>
    <h2><strong>Terms and Conditions</strong></h2>

    <p>Welcome to Colony!</p>
    </div>
  )
}

export default Agreement
