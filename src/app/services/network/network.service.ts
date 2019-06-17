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
  
  inscription(user) {
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
  connexion(user, password) {
    return new Promise((resolve, reject) => {
     // console.log(user);
      this.http.get(this.url + 'login?username='+user+'&password='+password)
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


}
