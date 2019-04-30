import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  tab;
  user = {email: "", password: ""};
  erreur;

  constructor(/*private authService: AuthService; */ private router: Router) {
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
  /*connexion() {
      this.erreur = null;
      this.authService.login(this.user).then((result) => {
          console.log(result);
          if(result['error']) {
              if(result['error'].indexOf("vérifiée")==-1) {
                  this.erreur = "La combinaison de l'email et du mot de passe ne correspondent pas"
              } else {
                  this.erreur = "Votre adresse email n'a pas été vérifiée."
              }
          } else {
              this.router.navigate(['/programme']);
          }
      }).catch((err) => {
          console.log(err);
      });
  }*/

}
