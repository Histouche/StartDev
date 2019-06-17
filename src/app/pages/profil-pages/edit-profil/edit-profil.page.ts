import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkService } from '../../../services/network/network.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html',
  styleUrls: ['./edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {

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
        age: ""
    };

  constructor(private network: NetworkService, private router: Router, public storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('id_token_startdev').then((val) => {
      this.user.username = val.username;
      this.user.email = val.email;
      this.user.password = val.password;
      this.user.role = val.role;
      console.log(this.user);
    });
  }

}
