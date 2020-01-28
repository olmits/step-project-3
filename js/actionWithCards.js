import RequestHelper from "./request-helper";

const userCredentials = {
    email: "test123@gmail.com",
    password: "Testuser!"
};

class ActionWithCards {

     async loginUser(email, password){
         const userCredentials = {
             email,
             password
         };
         const response = await RequestHelper.createUpdateData('POST', 'http://cards.danit.com.ua/login', userCredentials);
         return response.token
     }
}