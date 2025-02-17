import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class RateService {
    static async getMyRate(offerId: number) {
        return await fetchAPI(API_URL_BASE+`/offers/${offerId}/myRate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getGlobalRate(offerId: number) {
        return await fetchAPI(API_URL_BASE+`/offers/${offerId}/rate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async rate(offerId: number, value: number) {
        return await fetchAPI(API_URL_BASE+`/offers/${offerId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value}),
            credentials: 'include'
        })
    }


}