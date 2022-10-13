function AuthForm({isRegisterForm, onSubmit, handleInput,titleAuth, nameButton,email,password}){
 return(
    <form className="formAuth" onSubmit={(e)=>{onSubmit(e,email,password)}}> 
        <h2 className = "formAuth__title">{titleAuth}</h2>
        <input required type='email' className="formAuth__input formAuth__input_type_email" placeholder="Email" name="email" value={email} minLength="3" onChange={(e)=>{handleInput(e)}}></input>
        <input required type='text' className="formAuth__input formAuth__input_type_password" placeholder="Пароль" name="password" minLength="3" value={password} onChange={(e)=>{handleInput(e)}}></input>
        <button className="formAuth__button" type="submit">{nameButton}</button>
        {isRegisterForm ? (<a className="formAuth__link" href="/signin">Уже зарегистрированы? Войти</a>) : ''}
    </form>
 ) 
}

export default AuthForm;