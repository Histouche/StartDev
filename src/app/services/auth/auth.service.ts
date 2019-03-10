import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

// import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

declare var cordova: any;
const helper = new JwtHelperService();


@Injectable({
    providedIn: 'root',
})
export class AuthProvider {

    url;
    user;
    userToken;
    // JwtHelperService: JwtHelperService = new JwtHelperService();
    // isExpired = JwtHelperService.isTokenExpired(myRawToken);


    constructor(public http: Http, private authHttp: HttpClient, private storage: Storage, public jwtHelper: JwtHelperService) {
        console.log('Hello AuthProvider Provider');
        this.url = environment.urlAPI;
    }

    login(user) {
        return new Promise((resolve, reject) => {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.url + 'login', { email: user.email, password: user.password })
            //.map((res: Response) => res.json())
                .map(res => {
                    //console.log(res.headers.values()); // http header --> recup token Authorization
                    return res;
                })
                .subscribe(
                    data => {
                        console.log(data);
                        //let tab = data.headers.get('authorization').split(' ');
                        console.log(data['_body']);
                        if (data && data['_body'].indexOf('error') == -1) {
                            this.setCurrentUser(data['_body']).then((res) => {
                                resolve(data);
                            });
                        } else {
                            console.log(JSON.parse(data['_body']));
                            resolve(JSON.parse(data['_body']));
                        }
                    },
                    err => { reject(err); }
                )
        });
    }

    public registerInfos(data) {
        console.log('register', data);
        this.storage.set('user_diane', data);
    }

    public getUserInfos(recharger=false) {
        let authService = this;
        return new Promise((resolve, reject) => {
            if (this.user && !recharger) {
                resolve(this.user);
            } else {
                console.log('en ligne', navigator.onLine);
                if (!navigator.onLine) {
                    this.storage.get('user_diane').then((user) => {
                        if (user) {
                            resolve(user);
                        } else {
                            resolve(false);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    this.storage.get('id_token_diane').then((token) => {
                        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
                        //let options = new RequestOptions({ headers: headers });
                        authService.authHttp.get(authService.url + 'user/infos', { headers: headers })
                        //.map((res: HttpResponse<any>) => res.json())
                            .subscribe(
                                data => {
                                    console.log('result', data);
                                    resolve(data);
                                },
                                err => { reject(err); }
                            )
                    })
                }
            }
        });
    }

    /* addCompagnon(compagnon) {
      return new Promise((resolve, reject) => {
        if (this.user) {
          if (!this.user.compagnons)
            this.user.compagnons = [];
          this.user.compagnons.push(compagnon);
          this.storage.set('user_diane', this.user).then(() => {
            resolve(true);
          });
        } else {
          this.storage.get('user_diane').then((user) => {
            this.user = user;
            if (!this.user.compagnons)
              this.user.compagnons = [];
            this.user.compagnons.push(compagnon);
            this.storage.set('user_diane', this.user).then(() => {
              resolve(true);
            });
          })
        }
      });
    } */

    /* deleteCompagnon(compagnon) {
      console.log('delete', compagnon);
      return new Promise((resolve, reject) => {
        if (this.user) {
         if(this.user.compagnons) {
           this.user.compagnons.splice(this.user.compagnons.indexOf(compagnon), 1);
           this.storage.set('user_diane', this.user).then(() => {
             resolve(true);
           });
         } else {
           console.log('pas de compagnon');
           resolve(false);
         }
        } else {
          this.storage.get('user_diane').then((user) => {
            this.user = user;
            if (this.user.compagnons) {
              this.user.compagnons.splice(this.user.compagnons.indexOf(compagnon), 1);
              this.user.compagnons.push(compagnon);
              this.storage.set('user_diane', this.user).then(() => {
                resolve(true);
              });
            } else {
              console.log('pas de compagnon');
              resolve(false);
            }
          }).catch((err) => {
            console.log(err);
            resolve(false);
          });
        }
      });
    } */

    updateUser() {
        return new Promise((resolve, reject) => {
            this.storage.get('id_token_diane').then((token) => {
                let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
                this.authHttp.get(this.url + 'user/infos', { headers: headers })
                //.map((res: Response) => res.json())
                    .subscribe(
                        data => {
                            console.log('data user', data);
                            this.user = data;
                            this.registerInfos(data);
                            resolve(data);
                        },
                        err => { reject(err); }
                    )
            });
            /* if(user) {
              this.user = user;
              this.storage.set('user_diane', user).then(() => {
                resolve(true);
              }).catch((err) => {
                console.log(err);
                reject(false);
              });
            } else {
              console.log('no user send');
              reject(false);
            } */
        });
    }

    public getUserInfosLocal() {
        return new Promise((resolve, reject) => {
            if (this.user) {
                resolve(this.user);
            } else {
                this.storage.get('user_diane').then((user) => {
                    if (user) {
                        resolve(user);
                    } else {
                        resolve(false);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    // Store the token and current user information local
    private setCurrentUser(token) {
        this.userToken = token;
        return new Promise((resolve, reject) => {
            this.storage.set('id_token_diane', token).then(() => {
                this.getUserInfos().then((user) => {
                    this.user = user;
                    this.storage.set('user_diane', user).then(() => {
                        //this.storeFiles().then((res) => {
                        resolve(true);
                        /* }).catch((err) => {
                          reject(err);
                        }); */
                    }).catch((err) => {
                        reject(err);
                    });
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /* storeFiles() {
      return new Promise((resolve, reject) => {
        const fileTransfer: FileTransferObject = this.transfer.create();

        if(this.user) {
          let permis = this.user.user.permis;
          let assurance = this.user.user.assurance;
          console.log(permis, assurance);

        }

        //TEST
        this.getUserInfos().then((user) => {
          console.log(user);
          let permis = user['user'].permis;
          let assurance = user['user'].assurance;
          console.log(urlGlobal+permis);

          const url = 'https://diane-admin.dev.mediadev.info/fichiers/users/Original-Duplicatat-AutorisationChasserAccompagne.jpg';
          console.log('URL', url);


          fileTransfer.download(url, cordova.file.dataDirectory+'permis.jpg').then((entry) => {
            console.log('download complete: ' + entry.toUrl());
          }, (error) => {
            // handle error
            console.log(error);
          });
        })

        resolve(true);
      });
    } */

    loggedIn() {
        return this.storage.get('id_token_diane').then(token => {
            //console.log(token);
            return !this.jwtHelper.isTokenExpired(token);
        });
    }

    // Remove the JWT from our storage
    public deleteToken() {
        this.userToken = null;
        this.user = null;
        this.storage.remove('user_diane');
        return this.storage.remove('id_token_diane');
    }

    public logout() {
        return Observable.create(observer => {
            this.deleteToken();
            observer.next(true);
            observer.complete();
        });
    }

    initPassword(m, c) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url+"user/initPassword?m="+m+"&c="+c)
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
                        console.log('result init password', data);
                        resolve(data);
                    },
                    err => { reject(err); }
                )
        });
    }

    resetPassword(m, c, password) {
        let data = {m: m, c: c, password: password.password, confirm: password.confirm};
        return new Promise((resolve, reject) => {
            this.http.post(this.url+"user/resetPassword", data)
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
                        console.log('result reset password', data);
                        resolve(data);
                    },
                    err => { reject(err); }
                )
        });
    }

    /*  public getUserInfo() {
       if (this.userToken == undefined) {
         return new Promise((resolve, reject) => {
           this.storage.get('id_token_diane').then((result) => {
             this.userToken = result;
             if (!this.user && this.userToken) {
               let data = this.jwtHelper.decodeToken(this.userToken);
               this.user = data;
             }
             resolve(this.user);
           }).catch(err => {
             reject(err);
           });
         })
       } else if(this.user == undefined) {
         return new Promise((resolve, reject) => {
           let data = this.jwtHelper.decodeToken(this.userToken);
           this.user =data;
           resolve(this.user);
         });
       } else
         return new Promise((resolve, reject) => {
           resolve(this.user);
         });
     }
    */
}
