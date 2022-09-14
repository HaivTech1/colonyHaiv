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
    <p>
      These terms and conditions outline the rules and regulations for the use of getting a 
      property from Colony
    </p>

    <p>
      By accessing this website and app we assume you accept these terms and conditions.
      Do not continue to use Colony if you do not agree to take all of the terms and conditions stated on this page.
    </p>

      <p>
        The following terminology applies to these Terms and Conditions, Privacy Statement and 
        Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log 
        on this website and app and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We",
        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All
        terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance 
        to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of 
        provision of the Company’s stated services, in accordance with and subject to, prevailing law of Nigeria. Any use
        of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as
        interchangeable and therefore as referring to same.
      </p>

      <ul> 
        your email when you pay for this apartment. It follows that if there is a wrong information, receipt might not get to you and 
        that implies that there is no prove of your payment should things metamorphose into a legal issue. The Company will not be 
        liable for any misinformation during payment.
        2.Client shall abide to the property rules stated in the property descriptions, this rules are directly from the property owners and might differ based on the property. 
        3.Client must not use the property for any illegal activities against the client country of residence, the company have the right to hand the client over to the law.

<p> These terms and conditions can be modified and updated time to time with prior notice to new
 and existing clients
 </p>
    </div>
  )
}

export default Agreement
