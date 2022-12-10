import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import './Signup.css';
 




const SignUp = () => {
    const navigate = useNavigate()
    const [error,setError] = useState(null)
    const {createUser} = useContext(AuthContext)
    const handelSubmit = (event) =>{
        event.preventDefault()
       const form = event.target;
       const email =  form.email.value;
       const password = form . password .value;
       const confirm = form.confirm .value;
    //    console.log(email,password,confirm)
    if(password.length < 6){
        setError('password shoud be 6 charachers  or more')
        return;
    }
     if(password !== confirm){
        setError('Your passsword did not match' );
        return;
       
     }
     createUser(email,password)
     .then(result =>{
        const user = result.user;
         console.log(user);
         form.reset()
         navigate()
     })
     .catch(error=>console.error(error))
    }
    return (
        <div>
            <div className='form-container'>
            <h2 className='form-title'>Signup </h2>
            <form onSubmit={handelSubmit}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email'name='email' placeholder='Email' required></input>

                </div>
                <div className='form-control'>
                    <label htmlFor='password'>password</label>
                    <input type='password'name='password' placeholder='password' required></input>
                </div>
                <div className='form-control'>
                    <label htmlFor='confirm'>Confirm password</label>
                    <input type='password'name='confirm' placeholder=' confirm password' required></input>
                </div>
                <input className='btn-submit' type='submit'value="Signup"></input>

            </form>
            <p>Already have a in account <Link to="/login">login</Link></p>
            <p className='text-error'>{error}</p>
        </div>
        </div>
    );
};

export default SignUp;