 function PopupWithForm(props){
    return (
           <div className={`popup popup_function_${props.name} ${props.isOpen ? 'popup_opened': ''}`}>
                <div className="popup__overlay" onClick={() => {props.onClose()}}></div>
                <form noValidate className={`popup__window popup__window_type_${props.name} `} name={`${props.name}`} onSubmit ={props.onSubmit} >
                  <button className="popup__close-button popup__close-button_type_form" type="button" onClick={() => {props.onClose()}}> </button>
                  <h2 className="popup__header">{props.title}</h2>
                  {props.children}
                  <button className="popup__save-button popup__save-button_state_active" type="submit" onSubmit={() => {props.onClose()}}>Сохранить</button>
               </form>
            </div>
    )
 }

 export default PopupWithForm; 