import {Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { urlAPI } from '../url-api.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  url;
  user;
  token;

  constructor(private http:HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService, private httpClient: HttpClient, public jwtHelper: JwtHelperService) {
    this.url = urlAPI;
    console.log(this.url);
  }


  /* recupere toutes les annonces  */
  getAnnonces() {
    
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'get/annonces')
        //.map((res: Response) => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => { reject(err); }
        )
    })
  }
  getAnnonceById(id) {
    
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'get/annonce?idAnnonce='+id)
        //.map((res: Response) => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => { reject(err); }
        )
    })
  }
  getUsers() {
    
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'get/users')
        //.map((res: Response) => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => { reject(err); }
        )
    })
  }
  getUserById(id) {
    
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'get/user?idUser='+id)
        //.map((res: Response) => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => { reject(err); }
        )
    })
  }

  postuler(user, annonce) {
        console.log('fonction postuler');
      return new Promise((resolve, reject) => {
          console.log("Annonce concerné : ", annonce);
          this.http.post(this.url + 'post/postule?userId=' + user.id + '&annonceId=' + annonce.id, '')
              .subscribe(
                  data => {
                      console.log("subscribe register", data);
                      this.setCurrentUser(data).then((result) => {
                          if ( result['error']) {
                          } else {
                              console.log('user enregistré', result)
                              resolve(data);
                          }
                      });
                  },
                  err => {
                      reject(err);
                  }
              );
      })
      return new Promise((resolve, reject) => {
          this.http.post(this.url + 'post/postule?userId=' + user.id + '&annonceId=' + annonce.id, '')
              .subscribe(
                  data => {
                      console.log(data);
                      this.setCurrentUser(data).then((result) => {
                          if ( result['error']) {
                          } else {
                              console.log('user enregistré', result)
                              resolve(data);
                          }
                      });
                  },
                  err => { reject(err) })
      });
  }

  updateUser(user) {
      console.log("update user fonction");
      return new Promise((resolve, reject) => {
          console.log("User a mettre à jour ", user);
          this.http.get(this.url + 'update/user?username=' + user.username
              + '&password=' + user.password
              + '&email=' + user.email
              + '&role=' + user.role
              + '&nom=' + user.nom
              + '&prenom=' + user.prenom
              + '&adresse=' + user.adresse
              + '&telephone=' + user.telephone
              + '&description=' + user.description
              + '&isDisponible=' + user.isDisponible
              + '&siteWeb=' + user.siteWeb
              + '&prix=' + user.prix
              + '&pays=' + user.pays
              + '&langue=' + 'fr'
              + '&age=' + user.age )
              .map(res => {
                  console.log("map res", res)
                  return res;
              })
              .subscribe(
                  data => {
                      console.log("subscribe update user", data);
                      this.setCurrentUser(data).then((result) => {
                          if ( result['error']) {
                          } else {
                              console.log('user enregistré', result)
                              resolve(data);
                          }
                      });
                  },
                  err => {
                      reject(err);
                  }
              )
      });
  }

  exinscription(user) {
    console.log("dans register")
    return new Promise((resolve, reject) => {
      console.log("User a inscrire ", user);
      this.http.post(this.url + 'post/user', user)
        .map(res => {
          console.log("map res", res)
          return res;
        })
        .subscribe(
          data => {
            console.log("subscribe register", data);
            this.setCurrentUser(data).then((result) => {
                if ( result['error']) {
                } else {
                    console.log('user enregistré', result)
                    resolve(data);
                }
            });
          },
          err => {
            reject(err);
          }
        )
    });
  }

    inscription(user) {
        console.log("dans register");
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'post/user', user)
                .subscribe(
                    data => {
                        console.log(data);
                        this.setCurrentUser(data).then((result) => {
                            if ( result['error']) {
                            } else {
                                console.log('user enregistré', result)
                                resolve(data);
                            }
                        });
                    },
                    err => { reject(err) })
        });
    }
  connexion(user) {
    return new Promise((resolve, reject) => {
      console.log('user', user);
      this.http.get(this.url + 'get/login?username=' + user.username + '&password=' + user.password)
        /* .map(res => {
          return res;
        }) */
        .subscribe(
          data => {
            console.log("user", data)
            this.setCurrentUser(data).then((result) => {
                if ( result['error']) {
                } else {
                    console.log('user enregistré', result)
                    resolve(data);
                }
            });
          },
          err => {
            reject(err);
          }
        )
    });
  }
  private setCurrentUser(token) {
    return new Promise((resolve, reject) => {
      console.log(token);
      this.storage.set('id_token_startdev', token);
        this.storage.set('user_id', token.id);
      var session = this.storage.get('id_token_startdev') || null;
      if (session != null)
        resolve(true);
      else
        reject("Session a null")
      /*this.storage.set('id_token_anvie', token).then(() => {
        this.token = token;
        resolve(true);
      }).catch((err) => {
        reject(err);
      });*/
    })
  }

  logout(){
    return new Promise((resolve, reject) => {
      this.storage.set('id_token_startdev', '');
        resolve(true);
    })
  }


}
