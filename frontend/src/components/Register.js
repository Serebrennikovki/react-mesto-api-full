import {useState} from 'react';
import AuthForm from './AuthForm.js';

function Register({onRegistration}){
    const titleAuth = 'Регистрация';
    const nameButton = 'Зарегистрироваться';
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState(''); 

    function handleInput(e){
        if(e.target.name==='email'){
            setEmail(e.target.value);
        }
        else{
            setPassword(e.target.value);
        }     
    }
 

    return (
        <AuthForm 
        isRegisterForm={true}
        onSubmit={onRegistration}
        handleInput={handleInput}
        titleAuth={titleAuth}
        nameButton={nameButton}
        email={email}
        password={password}
    />
    )
}

export default Register;