import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('activeGame');
        if(localStorage.getItem('p_id')) navigate('/dash');
    },[navigate])

    const handleChange = (e, keyName) => {
        const newVal = {};
        newVal[keyName] = e.target.value;
        setUser(Object.assign(user, newVal))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/login',
            user
        )
            .then(res => {
                setErrors([]);
                console.log(res);
                if(res.data.flash_msgs) setErrors(res.data.flash_msgs);
                else{
                    Object.keys(res.data.logged_user).map((attr) =>{
                        localStorage.setItem(attr, res.data.logged_user[attr]);
                    });
                    navigate('/dash');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="generalFlex flexCol">
            <div className="container-gold" id="login_title">
                <h2 className="subTitle">Login</h2>
            </div>
            <form onSubmit={handleSubmit} className='w-80 generalFlex flexCol gap-1'>
                <div className="generalFlex flexCol gap-1">
                    {
                        errors.error_login_creds?
                        <p className="flash_msgs" id="error_login_creds">{errors.error_login_creds}</p>:
                        ''
                    }
                    <label className="screen" htmlFor="email">Email:</label>
                    <input className="screen" type="email" name="email" id="email" onInput={(e) => handleChange(e, 'email')} autoFocus/>
                    <p className="flash_msgs" id="error_login_email">{errors.error_login_email}</p>
                </div>
                <div className="generalFlex flexCol gap-1">
                    <label className="screen" htmlFor="password">Password:</label>
                    <input className="screen" type="password" name="password" id="password" onInput={(e) => handleChange(e, 'password')}/>
                    <p className="flash_msgs" id="error_login_pw">{errors.error_login_pw}</p>
                </div>
                <div className="generalFlex w-80">
                    <button className='screen-gold redBtn' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login