import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import noavatar from '../img/noavatar.png';

import '../css/pages/account.css';
import '../css/pages/auth.css';

function Account({API, createFormData}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isFormValid, setValidForm] = useState(false);

    const userInfo = useSelector(state => state.userInfo);

    const dispatch = useDispatch();

    const changeSettings = async(evt) => {
        evt.preventDefault();

        if(isFormValid === false) return false;

        const formObject = {
            name: name,
            email: email,
            phone: phone,
            avatar: avatar,
        }
        const formData = createFormData(formObject);

        try {
            await axios.post(`${API}/users`, formData, 
            { validateStatus: function() { return true; } })
            .then((res) => {
                let status = res.status;
                if(status === 200) {
                return dispatch(setSuccess('Account settings were successfully changed.'));
                }
                else return dispatch(setError(res.data.message));
            }).catch((err) => {
                return dispatch(setError(err));
            });
        } catch {
            return dispatch(setWarning("Internal Server Error. Try again later."));
        }
    };

    useEffect(() => {
        const validateEmail = () => {
            const emailTemplate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(email.match(emailTemplate)) {
                setValidForm(true);
            } else {
                setValidForm(false);
            }
        };
        validateEmail();
    }, [email]);

    useEffect(() => {
        const validatePhone = () => {
            if(phone.match(/\d/g) && phone.length === 11) {
                setValidForm(true);
            } else {
                setValidForm(false);
            }
        };
        validatePhone();
    }, [phone]);

    useEffect(() => {
        const setUserInfo = () => {
            setName(!userInfo.name ? '' : userInfo.name);
            setEmail(!userInfo.email ? '' : userInfo.email);
            setPhone(!userInfo.phone ? '' : userInfo.phone);
            setAvatar(!userInfo.avatar ? '' : userInfo.avatar);
        };
        setUserInfo();
    }, [userInfo]);

    return(
        <React.Fragment>
            <form className="profile-container" onSubmit={(evt) => changeSettings(evt)}>
                <h2 className="section-title">Account settings</h2>
                <div className="img-section"> 
                    { avatar !== '' 
                        ? <img src={`${API}/img/avatars/${avatar}`} className="avatar" alt={`${name}'s avatar`}/>
                        : <img src={noavatar} className="avatar" alt="noavatar.png"/>
                    }
                    <p><b>Profile Photo</b></p>
                    <p>Accepted file type .png. Less than 1MB</p> 
                    <label className="button">
                        Upload file  <input type="file" className="file-upload"/>
                    </label>
                </div>
                <div className="">
                    <div className="">
                        <label htmlFor="name">User Name</label>
                        <input type="text" className="" placeholder="Steve" 
                        value={name} onChange={(e) => setName(e.target.value)}/> 
                    </div>
                </div>
                <div className="">
                    <div className=""> 
                        <label htmlFor="email">Email Address</label> 
                        <input type="text" className="" placeholder="steve@email.com" 
                        value={email} onChange={(e) => setEmail(e.target.value)}/> 
                    </div>
                    <div className=""> 
                        <label htmlFor="phone">Phone Number</label> 
                        <input type="tel" className="" placeholder="+7 912 345-67-89" 
                        value={phone} onChange={(e) => setPhone(e.target.value)}/> 
                    </div>
                </div>
                <div className=""> 
                    <button type="submit" className="button">
                        Save Changes
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default Account;