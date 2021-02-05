import {API} from "../config";
export const getProducts = sortBY =>
{
    return fetch(`${API}/products?sortBY=${sortBY}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err)
    )
}