import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext, { AuthContext } from '../context/UserContext';
import './Login.css';



const Login = () => {
    const navigate = useNavigate()
    const { signIn } = useContext(AuthContext)
    const location  = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from,{replace:true})
                
            })
        .catch(error => console.error(error))
    }



    return (
        <div className='form-container'>
            <h2 className='form-title'>login </h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' placeholder='Email' required></input>

                </div>
                <div className='form-control'>
                    <label htmlFor='password'>pasword</label>
                    <input type='password' name='password' placeholder='password' required></input>


                </div>
                <input className='btn-submit' type='submit' value="login"></input>

            </form>
            <p>New to ema john <Link to="/signup">create a new account</Link></p>
        </div>
    );
};

export default Login;