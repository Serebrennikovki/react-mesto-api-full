import PopupWithForm from "./PopupWithForm";
import { useState, useEffect} from 'react';

function AddPlacePopup({onClose, isOpen, onAddPlace}){
    const initialFormData = {
        name: '',
        link: ''
    };
    const [formData, setFormData] = useState(initialFormData); 

    useEffect(()=>{
        setFormData(initialFormData);
    },[isOpen]);

     function handleInput(e){
        const {name, value} = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value
            } 
        } )

    }

    function handleSubmitAddPlace(e){
        e.preventDefault();
        onAddPlace(formData);
    }

    return <PopupWithForm
        onClose = {onClose}
        isOpen = {isOpen}
        onSubmit = {handleSubmitAddPlace}
        name="addCard"
        title="Добавить место">
          <div className = "popup__container">
              <input required id="nameCardInput" className="popup__input-text popup__input-text_field_name" name="name" placeholder="Название" type="text" minLength="2" onChange={(e)=>{handleInput(e)}} maxLength="30" value={formData.name}/> 
              <span className="popup__input-error" id="nameCardInput-error"></span>
          </div>
          <div className ="popup__container">
              <input required id="URLInput" className="popup__input-text popup__input-text_field_job" name='link' placeholder="Ссылка на картинку" type="url" onChange={(e)=>{handleInput(e)}} value={formData.link}/>
              <span className="popup__input-error" id="URLInput-error"></span>
          </div>
      </PopupWithForm>
}

export default AddPlacePopup;