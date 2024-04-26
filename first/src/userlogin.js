import React, { useState } from 'react';
import logo from './logo.jpg';
import { callApi, errorResponse, setSession } from './main';

const popupwindowstyle = { width: '300px', height: '300px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function UserLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function validate() {
        const url = "http://localhost:5000/user/login";
        const data = JSON.stringify({
            emailid: username,
            pwd: password
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }

    function loginSuccess(res) {
        const data = JSON.parse(res);
        if (data === 1) {
            setSession("user_sid", username, (24 * 60)); // Set user session
            window.location.replace("/user/dashboard"); // Redirect to user dashboard
        } else {
            alert("Invalid Credentials!");
        }
    }

    return (
        <div className='full-height'>
            <div id='header' className='loginheader'>User Login</div>
            <div id='content' className='logincontent'>
                <div id='login' className='popup'>
                    <div id='popupwindow' className='popupwindow' style={popupwindowstyle}>
                        <div className='loginstyle1'>User Login</div>
                        <div className='loginstyle2'>
                            <div style={logodivstyle}>
                                <img src={logo} alt='' style={logostyle} />
                            </div>
                            <div>Username*</div>
                            <div><input type='text' className='txtbox' value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' className='txtbox' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={validate}>Sign In</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer' className='loginfooter'>Copyright @ ART. All rights reserved.</div>
        </div>
    );
}

export default UserLogin;
