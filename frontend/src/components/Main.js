//import { queryByDisplayValue } from '@testing-library/react';
import React, {  useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props){
    const dataUser = useContext(CurrentUserContext);

    return (
        <main className="page__content">
            <section className="profile"> 
                <div className="profile__author">
                    <button className="profile__changeAvatar-button" onClick={props.onEditAvatar} type="button">
                        <img className="profile__avatar" src={dataUser.avatar} alt="портрет"/>
                    </button>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name block">{dataUser.name}</h1>
                            <p className="profile__job block">{dataUser.about}</p>
                        </div>
                        <button className="profile__change-button" onClick={props.onEditProfile} type="button"></button>  
                    </div>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>
            <section className="cards">
                <ul className="cards__table">
                    {
                        props.cards.map((card) => {
                            return < Card
                            key = {card._id}
                            card = {card}
                            onCardClick = {props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                                />
                        })
                    }
                </ul>
            </section>
        </main>
    )

}

export default Main;
