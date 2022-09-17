import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm_pw: ''
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
        setNewUser(Object.assign(newUser, newVal))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/register',
            newUser
        )
            .then(res => {
                setErrors([]);
                console.log(res);
                if(res.data.flash_msgs) setErrors(res.data.flash_msgs);
                else{
                    Object.entries(res.data.logged_user).map((attr, val) =>{
                        return localStorage.setItem(attr, val);
                    });
                    navigate('/dash');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="generalFlex flexCol">
            <div className="container-gold" id="register_title">
                <h2 className="subTitle">Register</h2>
            </div>
            <form onSubmit={handleSubmit} className='w-80 generalFlex flexCol gap-1'>
                <div className="generalFlex flexCol gap-1">
                    <label className="screen" htmlFor="name">Username:</label>
                    <input className="screen" type="text" name="name" id="name" onInput={(e) => handleChange(e, 'name')} autoFocus/>
                    <p className="flash_msgs" id="error_reg_name">{errors.error_reg_name}</p>
                </div>
                <div className="generalFlex flexCol gap-1">
                    <label className="screen" htmlFor="email">Email:</label>
                    <input className="screen" type="email" name="email" id="email" onInput={(e) => handleChange(e, 'email')}/>
                    <p className="flash_msgs" id="error_reg_email">{errors.error_reg_email}</p>
                </div>
                <div className="generalFlex flexCol gap-1">
                    <label className="screen" htmlFor="password">Password:</label>
                    <input className="screen" type="password" name="password" id="password" onInput={(e) => handleChange(e, 'password')}/>
                    <p className="flash_msgs" id="error_reg_pw">{errors.error_reg_pw}</p>
                </div>
                <div className="generalFlex flexCol gap-1">
                    <label className="screen" htmlFor="confirm_pw">Confirm Password:</label>
                    <input className="screen" type="password" name="confirm_pw" id="confirm_pw" onInput={(e) => handleChange(e, 'confirm_pw')}/>
                    <p className="flash_msgs" id="error_reg_conf_pw">{errors.error_reg_conf_pw}</p>
                </div>
                <div className="generalFlex w-80">
                    <button className='redBtn screen-gold' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register