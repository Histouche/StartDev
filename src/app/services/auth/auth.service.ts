import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { urlAPI } from '../url-api.service';
import 'rxjs/add/operator/map';
import { reject } from 'q';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { OfflineManagerService } from './offline-manager.service';

const helper = new JwtHelperService();

interface User {
    email: string,
    nom: string,
    prenom: string,

    programmes: {
        nom: string,
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    url;
    user;
    userToken;

    constructor(private http: Http, private httpCli: HttpClient, private storage: Storage, public jwtHelper: JwtHelperService) {
        this.url = urlAPI;
    }




    /*getCurrentUser() {

        return new Promise((resolve, reject) => {
            return this.storage.get('id_token_powerdiet').then(token => {
                let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
                let request = this.httpCli.get(this.url + 'user/infos', { headers: headers });

                this.offlineManagerService.load('user/infos', request, false, token, 0).subscribe(data => {
                        resolve(data);
                    },
                    err => { reject(err); }
                );

            });
        });
    }*/






   /* login(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'login', { email: user.email, password: user.password })
                .subscribe(
                    data => {
                        console.log(data);
                        if (data && data['_body'].indexOf('error') == -1) {
                            this.setCurrentUser(data['_body']).then((res) => {
                                resolve(data);
                            });
                        } else {
                            console.log(JSON.parse(data['_body']));
                            resolve(JSON.parse(data['_body']));
                        }
                    },
                    err => { reject(err) })
        });
    }*/

    /*inscription(user) {
        return new Promise((resolve, reject) => {
            this.httpCli.post(this.url + 'user/register', user)
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => { reject(err) })
        });
    }*/

    /*initPassword(m, c) {
        return new Promise((resolve, reject) => {
            this.httpCli.get(this.url + 'user/initPassword?c=' + c + '&m=' + m)
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        reject(err);
                    }
                )
        });
    }*/

   /* resetPassword(m, c, password) {
        let data = { m: m, c: c, password: password.password, confirm: password.confirm };
        return new Promise((resolve, reject) => {
            this.http.post(this.url + "user/resetPassword", data)
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
                        console.log('result reset password', data);
                        resolve(data);
                    },
                    err => { reject(err); }
                )
        });
    }*/

   /* oubliPassword(email) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'user/forgotPassword', { email: email })
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    err => { reject(err); }
                )
        });
    }*/

    // Store the token and current user information local
   /* private setCurrentUser(token) {
        this.userToken = token;
        return new Promise((resolve, reject) => {
            this.storage.set('id_token_powerdiet', token).then(() => {
                resolve(true);

            }).catch((err) => {
                reject(err);
            });
        });
    } */



   /* loggedIn() {
        return this.storage.get('id_token_powerdiet').then(token => {
            //console.log(token);
            return !this.jwtHelper.isTokenExpired(token);
        });
    }
*/
   /* public logout() {
        return Observable.create(observer => {
            this.deleteToken();
            observer.next(true);
            observer.complete();
        });
    }*/

    /*private deleteToken() {
        this.userToken = null;
        this.user = null;
        return this.storage.remove('id_token_powerdiet');
    }*/
}
