import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({onClose, isOpen, onUpdateUser}){
    const [nameProfile, setNameProfile] = useState();
    const [descriptionProfile, setDescriptionProfile] = useState();
    const currentUser = useContext(CurrentUserContext);

    useEffect(()=>{
      setNameProfile(currentUser.name);
      setDescriptionProfile(currentUser.about);
    },[currentUser,isOpen]);

    function handleChangeNameProfile(e){
      setNameProfile(e.target.value)
    }

    function handleChangeDescriptionHandle(e){
      setDescriptionProfile(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();
      onUpdateUser({
        name:nameProfile, 
        about:descriptionProfile
      });
    }

    return (
      <PopupWithForm
          onClose = {onClose}
          isOpen = {isOpen}
          onSubmit = {handleSubmit}
          name="editPtofile"
          title="Редактировать профиль" >
          <div className="popup__container">
            <input required id="nameInput" className="popup__input-text popup__input-text_field_name" name="name" placeholder="Жак-Ив Кусто" type="text" minLength="2" maxLength="40" value={nameProfile || ""} onChange={handleChangeNameProfile}/>
            <span className="popup__input-error" id="nameInput-error"></span>
          </div>
          <div className="popup__container">
            <input required id="jobInput" className="popup__input-text popup__input-text_field_job" name="about" placeholder="Исследователь океана" type="text" minLength="2" maxLength="200" value={descriptionProfile || ""} onChange={handleChangeDescriptionHandle} />
            <span className="popup__input-error" id="jobInput-error"></span>
          </div>
        </PopupWithForm> 
    ) 
    

}

export default EditProfilePopup;