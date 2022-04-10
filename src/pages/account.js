import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../css/pages/account.css';
import '../css/pages/auth.css';

function Account({API}) {
    return(
        <React.Fragment>
            <div className="">
                <h4 className="">Account settings</h4>
                <div className=""> <img src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="img" alt=""/>
                    <div className="" id="img-section">
                        <b>Profile Photo</b>
                        <p>Accepted file type .png. Less than 1MB</p> 
                        <button className="button"><b>Upload</b></button>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className=""> 
                        <label for="firstname">First Name</label>
                        <input type="text" className="" placeholder="Steve"/> 
                    </div>
                </div>
                <div className="">
                    <div className=""> 
                        <label for="email">Email Address</label> 
                        <input type="text" className="" placeholder="steve_@email.com"/> 
                    </div>
                    <div className=""> 
                        <label for="phone">Phone Number</label> 
                        <input type="tel" className="" placeholder="+1 234-567-8900"/> 
                    </div>
                </div>
                <div className=""> 
                    <button className="button">Save Changes</button> 
                    <button className="button">Cancel</button>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Account;