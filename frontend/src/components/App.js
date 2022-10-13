//import logo from './logo.svg';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import {register,authorize,checkJWT} from '../utils/auth.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolPopupOpen, setInfoToolPopupOpen] = React.useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(()=>{
    api.getUserInfo()
      .then((response)=>{
        setCurrentUser(response);
      })
      .catch((error)=>{console.log(error);})
  },[]);

  React.useEffect(()=>{
    api.getInitialCards()
      .then((resp)=>{
        setCards(resp);
      })
      .catch((error)=>{console.log(error);})
  }, []);
  
  React.useEffect(()=>{
    checkToken();
  }, []);

  function handleCardLike(card){
    const isLiked = card.likes.some(i=> i._id === currentUser._id);
    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard)=>{
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error)=>{console.log(error);})
    }

  function handleCardDelete(card){
    api.deleteCard(card._id)
      .then(()=>{
        setCards(cards.filter((item)=>{
          if(!(item._id === card._id)){
            return item;
          }
        }))
      })
      .catch((error)=>{console.log(error);})
  }

  function handleUpdateUser(data){
    api.changeUserInfo(data)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      }   
    )
    .catch((error)=>{console.log(error);})
  }

  function handleUpdateAvatar(link){
    api.changeAvatar(link)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error)=>{console.log(error);})
  }

  function handleAddPlace(data){
    api.addCard(data)
      .then((res)=>{
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error)=>{console.log(error);})
  }


  
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
}

function handleEditProfileClick(){
  setIsEditProfilePopupOpen(true);
}
function handleAddPlaceClick(){
  setIsAddPlacePopupOpen(true);
}
function handleCardClick(card){
  setSelectedCard(card);
  setIsImagePopupOpen(true);
}
function closeAllPopups(){
  setIsAddPlacePopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
  setIsImagePopupOpen(false);
  setInfoToolPopupOpen(false);
  }
function handleResAuth(isSuccess){
  setIsSuccessAuth(isSuccess);
  setInfoToolPopupOpen(true);
}
function checkToken(){
  if (localStorage.getItem('jwt')){
    let jwt = localStorage.getItem('jwt');
    checkJWT(jwt)
    .then(({data})=>{
      console.log(data);
      if(data){
        setUserEmail(data.email);
        setLoggedIn(true);
        console.log(loggedIn,userEmail);
        history.push('/');
      }
    })
    .catch((error)=>{console.log(error);})
  }
}

function onLogin(e, email, password){
    e.preventDefault();
    authorize(email, password)
    .then((data)=>{
        if(data){
            localStorage.setItem('jwt', data.token);
            setUserEmail(email);
            setLoggedIn(true);
            history.push('/');
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

function onRegistration(e, email, password){
  e.preventDefault();
  register(email, password)
  .then((data)=>{
      if(data){
          console.log(data);
          history.push('/signin');
          handleResAuth(true);
      }
      else{
          console.log(data);
          handleResAuth(false);
      }
  })
  .catch((err)=>{
      console.log(err);
      handleResAuth(false);
  })
  console.log(email,password);
}



  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header
          handleLogin={setLoggedIn}
          email={userEmail}
        />
        <Switch>
          <Route path="/signup">
            <Register
            onRegistration={onRegistration}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={onLogin}
              setUserEmail={setUserEmail}
            />
          </Route>
          <ProtectedRoute 
            path="/"
            loggedIn = {loggedIn}
            component = {Main}
            cards={cards}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            onEditProfile ={handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}/>       
        </Switch>
        <InfoToolTip 
          isOpen = {isInfoToolPopupOpen}
          onClose = {closeAllPopups}
          isSuccess = {isSuccessAuth}
        />
        <EditProfilePopup onClose = {closeAllPopups} isOpen = {isEditProfilePopupOpen} onUpdateUser = {handleUpdateUser}/>
        <EditAvatarPopup onClose={closeAllPopups} isOpen = {isEditAvatarPopupOpen} onUpdateAvatar = {handleUpdateAvatar}/>
        <AddPlacePopup onClose={closeAllPopups} isOpen = {isAddPlacePopupOpen} onAddPlace = {handleAddPlace} />
        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"/>
        <ImagePopup
          card = {selectedCard}
          isOpen = {isImagePopupOpen}
          onClose = {closeAllPopups}
        />
        <Footer/>
    </div>
  </CurrentUserContext.Provider>
   
  );
}

export default App;
