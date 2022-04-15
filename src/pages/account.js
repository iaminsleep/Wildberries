import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setError, setWarning, setSuccess } from '../.store/actions/setMessages';

import noavatar from '../img/noavatar.png';

import '../css/pages/account.css';
import '../css/pages/auth.css';

function Account({API, createFormData, getCookie, getUserInfo}) {
    const [isEditing, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState('');
    const [isFormValid, setValidForm] = useState(false);

    const userInfo = useSelector(state => state.userInfo);

    const dispatch = useDispatch();

    const randomString = (length = 8) => {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    };

    const fileSelect = event => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            setAvatarFile(reader.result);
        };
        reader.readAsDataURL(file);
        const generatedFileName = randomString();
        setAvatar(generatedFileName);
        event.target.value = '';
    }

    const changeSettings = async(evt) => {
        evt.preventDefault();

        const accessToken = getCookie('accessToken');

        if(isFormValid === false ) return false;      
        if(name === userInfo.name && email === userInfo.email 
            && phone === userInfo.phone && avatar === userInfo.avatar) return false;

        const formObject = {
            name: name,
            email: email,
            phone: phone,
            avatarName: avatar,
            avatar: avatarFile,
        }
        const formData = createFormData(formObject);

        try {
            await axios.post(`${API}/users`, formData, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            }, { validateStatus: function() { return true; } })
            .then((res) => {
                let status = res.status;
                if(status === 200) {
                    getUserInfo();
                    setAvatarFile('');
                    setAvatar('');
                    setEdit(false);
                    return dispatch(setSuccess('Account settings were successfully changed.'));
                }
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
            <div className="account-container">
                {isEditing === false && 
                    <div className="profile-container">
                        <h2 className="section-title">Profile Overview</h2>
                        <div className="img-section"> 
                            { avatar !== '' 
                                ? <img src={`${API}/img/avatars/${userInfo.avatar}`} className="avatar big" alt={`${name}'s avatar`}/>
                                : <img src={noavatar} className="avatar big" alt="noavatar.png"/>
                            }
                        </div>
                        <div className="info-block">
                            <div className="info-part">
                                <p>Name:</p><b>{name}</b>
                            </div>
                            <div className="info-part">
                                <p>Email:</p><b>{email}</b>
                            </div>
                            <div className="info-part">
                                <p>Phone:</p><b>{phone}</b>
                            </div>
                            <div className="info-part">
                                <p>Status:</p><b className="online-status"><div id="circle"></div> online</b>
                            </div>
                        </div>    
                        <div className="input"> 
                            <button className="button" onClick={() => setEdit(true)}>Edit profile</button>
                        </div>
                    </div>  
                }
                {isEditing === true && 
                    <form className="profile-container" onSubmit={(evt) => changeSettings(evt)}>
                        <h2 className="section-title"> Account settings</h2>
                        <div className="img-section"> 
                            { avatar !== '' 
                                ? <img src={`${API}/img/avatars/${userInfo.avatar}`} className="avatar small" alt={`${name}'s avatar`}/>
                                : <img src={noavatar} className="avatar small" alt="noavatar.png"/>
                            }
                            <p><b>Profile Photo</b></p>
                            <p>Accepted file type .png. Less than 1MB</p>
                            <input type="file" className="file-upload" onChange={(e) => fileSelect(e)}/>
                        </div>
                        <div className="field-inputs">
                            <div className="input">
                                <label htmlFor="name" className="input-label">User Name</label>
                                <input type="text" className="input-field" placeholder="Steve" name="name"
                                    value={name} onChange={(e) => setName(e.target.value)}/> 
                            </div>
                            <div className="input"> 
                                <label htmlFor="email" className="input-label">Email Address</label> 
                                <input type="text" className="input-field" placeholder="steve@email.com" 
                                    name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                            </div>
                            <div className="input"> 
                                <label htmlFor="phone" className="input-label">Phone Number</label> 
                                <input type="tel" className="input-field" placeholder="+8 912 345-67-89" 
                                    name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/> 
                            </div>
                        </div>
                        <div class="edit-btns">
                            <button className="button" style={{ marginTop: '1.5rem' }} 
                                onClick={() => setEdit(false)}>Cancel</button>
                            <div className="input"> 
                                <button type="submit" className="input-submit">
                                    Update account settings
                                </button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </React.Fragment>
    );
}

export default Account;