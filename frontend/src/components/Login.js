import {useState} from 'react';
import AuthForm from './AuthForm';


function Login ({onLogin}){
    const titleAuth = 'Вход';
    const nameButton = 'Войти';
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
            isRegisterForm={false}
            onSubmit={onLogin}
            handleInput={handleInput}
            titleAuth={titleAuth}
            nameButton={nameButton}
            email={email}
            password={password}
        />
    )

}

export default Login;