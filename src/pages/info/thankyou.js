import React from 'react';

import '../../css/pages/placeholder.css';
import emailPic from '../../img/email-picture.png';

function ThankYouPage() {
  return(
    <section className="background">
      <div className="box-main more-margin">
        <div className="firstHalf">
          <p className="text-big">Thank you for joining us!</p>
          <p className="text-small">
              We have sent a verification email to the provided address.
          </p>
          <img src={emailPic} alt="email icon"/>
        </div>
      </div>
    </section>
  );
}

export default ThankYouPage;