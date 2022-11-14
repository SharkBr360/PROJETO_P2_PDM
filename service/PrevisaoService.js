import axios from 'axios'

const base = axios.create({
baseURL: 'https://ga18a8d69fba8be-climatemporest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/clima'
})

const obterLista = () => {
    return base.get('/')
}

const cadastrarPrevisoes = (previsao) => {
    return base.post(
        '/',
        previsao,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*'}}
    );
}

export {obterLista, cadastrarPrevisoes}