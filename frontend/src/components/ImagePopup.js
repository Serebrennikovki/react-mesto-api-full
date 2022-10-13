function ImagePopup({card, isOpen, onClose}){
    return(
        <div className={`popup popup_function_bigImage ${isOpen ? 'popup_opened': ''}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="bigImage">
                <button className="popup__close-button bigImage__button-close" type="button" onClick={onClose}></button>
                <img className="bigImage__img" src={card.link} alt={card.name}/>
                <h2 className="bigImage__name">{card.name}</h2>
            </div>
        </div>
    )
}
export default ImagePopup;