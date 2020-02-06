import {SheduleException} from "./shedule-component.js";

export class RequestHelper {
    
    _handleError(response){
        if (!response.ok) {
            throw new SheduleException(response.statusText);
        }
        return response;
    }

    // Get all or one card, delete card
    static async getOrDelData(method, url, token) {
        return await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            }

        })
        .then(this._handleError)
        .then((response) => response.json())
        .catch(function(error){
            console.log(error);
        });
    }

    // Post/PUT data
    static async createUpdateData(method, url, obj, token = '') {
        return await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(this._handleError)
        .then((response) => response.json())
        .catch(function(error){
            console.log(error);
        });
    }
}
