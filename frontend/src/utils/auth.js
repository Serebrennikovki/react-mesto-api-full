const BASE__URL = 'https://auth.nomoreparties.co/';

function _checkResponse(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(email, password){
    return fetch(`${BASE__URL}signup`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            password:password,
            email:email})
    })
    .then(res=>_checkResponse(res))
}

export function authorize(email, password){
    return fetch (`${BASE__URL}signin`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            password:password,
            email:email
        })   
    })
    .then(res=>_checkResponse(res))
}

export function checkJWT(token){
    return fetch(`${BASE__URL}users/me`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(res=>_checkResponse(res))
}