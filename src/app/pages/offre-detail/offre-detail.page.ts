import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {NetworkService} from '../../services/network/network.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.page.html',
  styleUrls: ['./offre-detail.page.scss'],
})
export class OffreDetailPage implements OnInit {

  annonce;
  postule = false;
  erreur;
    user = {
        username: "",
        password: "",
        email: "",
        role: "ROLE_FREELANCE",
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

  constructor(private Arouter: ActivatedRoute, private network: NetworkService, private router: Router, public storage: Storage) {
    this.Arouter.queryParams.subscribe(params => {
      this.annonce = params;
    })
  }

  ngOnInit() {
    console.log(this.annonce);
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

  postuler() {
      this.erreur = null;
      this.network.postuler(this.user, this.annonce).then((result) => {
          console.log(result);
          if(result['error']) {
              console.log("erreur postuler");
          } else {
              // this.storage.set('user_id', result.id);
              // this.router.navigate(['/offre-detail']);
              this.postule = true;
          }
      }).catch((err) => {
          console.log(err);
      });
  }

}
