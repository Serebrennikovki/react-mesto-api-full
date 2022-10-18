class Api {
    constructor(option){
        this._baseUrl = option.baseUrl;
    }

    _sendRequest(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    

    getInitialCards(token){
        return fetch(`${this._baseUrl}cards`,
        {
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
                 'Content-Type': 'application/json'
            },
        })
          .then(res=>this._sendRequest(res))
    }

    getUserInfo(token){
        return fetch(`${this._baseUrl}users/me`,{
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
                 'Content-Type': 'application/json'
            },
        })
        .then(res=>this._sendRequest(res))
    }

    addCard(data, token){
        return fetch(`${this._baseUrl}cards` ,{
            method: 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`,
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
              })
        })
        .then(res=>this._sendRequest(res))
    }

    changeUserInfo(data, token){
        return fetch(`${this._baseUrl}users/me`,{
        method: 'PATCH',
        headers: {
            "Authorization" : `Bearer ${token}`,
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
            .then(res=>this._sendRequest(res))
    }

    deleteCard(idCard, token){
        return fetch(`${this._baseUrl}cards/${idCard}`,{
            method:'DELETE',
            headers: {
                "Authorization" : `Bearer ${token}`,
                 'Content-Type': 'application/json'
               },
        })
        .then(res=>this._sendRequest(res))
    }

    changeLikeStatus(id, isLiked, token){
        if(isLiked){
        return fetch(`${this._baseUrl}cards/${id}/likes`,{
            method: 'PUT',
            headers: {
                "Authorization" : `Bearer ${token}`,
                 'Content-Type': 'application/json'
               }
        })
            .then(res=>this._sendRequest(res))
        } else {
            return fetch(`${this._baseUrl}cards/${id}/likes`,{
                method: 'DELETE',
                headers: {
                    "Authorization" : `Bearer ${token}`,
                     'Content-Type': 'application/json'
                }
            })
                .then(res=>this._sendRequest(res))
        }
    }

    changeAvatar(link,token){
        return fetch(`${this._baseUrl}users/me/avatar`,{
            method: 'PATCH',
            headers: {
                "Authorization" : `Bearer ${token}`,
                 'Content-Type': 'application/json'
               },
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then(res=>this._sendRequest(res))
    }

}
const api = new Api({
    baseUrl: 'https://api.v.mesto.nomoredomains.icu/',
  });

  export default api;
