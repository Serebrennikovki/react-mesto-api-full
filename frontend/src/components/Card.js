import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props){

    const dataUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === dataUser._id;
    const cardDeleteButtonClassName = `${isOwn ? '' : 'card__button-del_state_disable'} card__button-del`;
    const isLiked = props.card.likes.some(i=> i._id === dataUser._id);
    const cardLikeButtonClassName = `card__button-like ${isLiked ? 'card__button-like_state_active':''}`

    function handleClick() {
        props.onCardClick(props.card);
      } 

    function handleLikeClick(){
        props.onCardLike(props.card);
        }
    
    function handleCardDelete(){
        props.onCardDelete(props.card);
    }

    return (
    <li className="card">
        <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
        <div className="card__description">
            <h2 className="card__name block">{props.card.name}</h2>
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="card__amount-like">{props.card.likes.length}</p>
        </div>  
    </li>)
}
export default Card;