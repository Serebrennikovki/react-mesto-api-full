import { useRef,useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const currentUser = useContext(CurrentUserContext);
    const avatarLinkRef = useRef(currentUser.avatar);

    function handleSubmit(e){
        e.preventDefault();
        onUpdateAvatar(avatarLinkRef.current.value);
    }

    return (
        <PopupWithForm
          onClose = {onClose}
          isOpen = {isOpen}
          onSubmit = {handleSubmit}
          name="changeAvatar"  
          title="Обновить аватар">
            <div className ="popup__container">
              <input required id="URLInputAvatar" className="popup__input-text popup__input-text_field_job" name="avatar" placeholder="Ссылка на картинку" type="url" ref={avatarLinkRef}/>
              <span className="popup__input-error" id="URLInputAvatar-error"></span>
            </div>
        </PopupWithForm>

)


}

export default EditAvatarPopup;
