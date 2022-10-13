import logo from '../images/Vector_logo.svg'
import { Route, Switch, Link, useHistory} from 'react-router-dom';

function Header({handleLogin,email}){
   const userEmail = email;
   const history = useHistory();

   function onSignOut(){
      localStorage.removeItem('jwt');
      handleLogin(false);
      history.push('/signin');
   }

   return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого"/>
      <Switch>
         <Route path="/signin">
            <Link to="/signup" className='header__link'>Регистрация</Link>
         </Route>
         <Route path="/signup">
            <Link to="/signin" className='header__link'>Войти</Link>
         </Route>
         <Route path="/" exact>
            <div className="header__containerUserInfo">
               <p className='header__login'>{userEmail}</p>
               <button onClick={onSignOut} className='header__button'>Выйти</button>
            </div>
         </Route>
      </Switch>
    </header>
 )   
}

export default Header;