class RequestHelper {

    // Get all or one card, delete card
   static async getOrDelData(method, url, token) {
       return await fetch(url, {
           method: method,
           headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json;charset=utf-8'
           }

       }).then((response) => response.json());
    }

    // Post/PUT data
    static async createUpdateData(method, url, obj, token = '') {
        return await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(obj)
        }).then((response) => response.json());
    }
}

export default RequestHelper;