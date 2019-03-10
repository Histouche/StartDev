import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage {

  canditaturesEnCours = 1;
  offresEnCours = 2;
  nom = 'Rodrigues';
  prenom = 'Jonathan';
  job = "Developpeur Full Stack / Intégrateur"
}
