import img__good from '../images/Union-good.png';
import img__bad from '../images/Union-bad.png'
function InfoToolTip(props){
 return(
    <div className={`popup ${props.isOpen ? 'popup_opened': ''}`}>
                <div className="popup__overlay" onClick={() => {props.onClose()}}></div>
                <div className={`popup__window popup__window_type_${props.name} `}>
                    <button className="popup__close-button popup__close-button_type_form" type="button" onClick={() => {props.onClose()}}> </button>
                    <div className = 'popup__container-infoToolTip'>
                        <img src={props.isSuccess ? img__good : img__bad} alt="good" className="popup__img"/>
                        <p className='popup__text'>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    </div>
               </div>
    </div>
    )
}

export default InfoToolTip;