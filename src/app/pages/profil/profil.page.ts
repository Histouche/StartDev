import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network/network.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage implements OnInit {

    erreur;
    user = {
        username: "",
        password: "",
        email: "",
        role: "",
        nom: "",
        prenom: "",
        adresse:"",
        telephone:"",
        description:"",
        isDisponible:"",
        siteWeb: "",
        prix: "",
        pays:"",
        langue: "fr",
        age: "",
        metier: "",
        énumération : true
    };

    ava = false;
    id;
    canditaturesEnCours = 1;
    offresEnCours = 2;
    job = "Developpeur Full Stack / Intégrateur";

    constructor(private router: Router , private network: NetworkService, private http: HttpClient, public storage: Storage) {

    }
    ngOnInit() {
        this.storage.get('id_token_startdev').then((val) => {
            this.user.username = val.username;
            this.user.email = val.email;
            this.user.password = val.password;
            this.user.role = val.role;
            this.user.nom = val.nom;
            this.user.prenom = val.prenom;
            this.user.adresse = val.adresse;
            this.user.telephone = val.telephone;
            this.user.isDisponible = val.isDisponible;
            this.user.siteWeb = val.siteWeb;
            this.user.prix = val.prix;
            this.user.pays = val.pays;
            this.user.age = val.age;
            console.log(this.user);
        });
    }

    logout() {
        this.erreur = null;
        this.network.logout().then((result) => {
            console.log(result);
            if(result['error']) {
                console.log("erreur postuler");
            } else {
                // this.storage.set('user_id', result.id);
                this.router.navigate(['/connexion']);
                
            }
        }).catch((err) => {
            console.log(err);
        }
    }

}
