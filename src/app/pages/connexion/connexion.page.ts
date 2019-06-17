import { Component, OnInit, Input } from '@angular/core';
import { NetworkService } from '../../services/network/network.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  tab;
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
      age: ""
   };
  erreur;
  @Input() password;

  constructor(private network: NetworkService, private router: Router, public storage: Storage) {
      this.tab = true;
  }

  ngOnInit() {
  }
  changeTab(lab) {
    if ( lab === 'con') {
        this.tab = true;
    }
    if ( lab === 'ins') {
      this.tab = false;
    }
  }
  connexion() {
      this.erreur = null;
      this.network.connexion(this.user).then((result) => {
          console.log(result);
          if ( result['error']) {
              if ( result['error'].indexOf("vérifiée") == -1) {
                  this.erreur = "La combinaison de l'email et du mot de passe ne correspondent pas"
              } else {
                  this.erreur = "Votre adresse email n'a pas été vérifiée."
              }
          } else {
              // this.storage.set('user_id', result.id);
              this.router.navigate(['/']);
          }
      }).catch((err) => {
          console.log(err);
      });
  }

  inscription() {
      this.erreur = null;
      this.network.inscription(this.user).then((result) => {
        console.log(result);
          if(result['error']) {
              console.log("erreur inscription");
          } else {
              // this.storage.set('user_id', result.id);
              this.router.navigate(['/']);
          }
      }).catch((err) => {
        console.log(err);
    });
  }

}
