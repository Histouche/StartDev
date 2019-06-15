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

  user = {
    "id": 1,
    "username": "admin",
    "username_canonical": "admin",
    "email": "admin@startdev.fr",
    "email_canonical": "admin@startdev.fr",
    "enabled": true,
    "salt": "iq203fm0jbc4gsgkoowskw00kwssc4c",
    "password": "$2y$13$iq203fm0jbc4gsgkoowskuMBHt.kOb62sd7FKj.eK73pEN2u5NkDK",
    "last_login": "2019-04-28T06:22:23+00:00",
    "locked": false,
    "expired": false,
    "roles": [
        "ROLE_SUPER_ADMIN"
    ],
    "credentials_expired": false,
    "nom": "Curiel",
    "prenom": "Guillaume",
    "adresse": "11 rue Alfred de Musset, 93290 Tremblay-en-France",
    "telephone": "0148601967",
    "description": "Je suis le super admin de la plateforme",
    "url_photo": "42b37cfb4ef39e1020eca42c1a1a95b1.png",
    "pays": "France",
    "langue": "Français",
    "age": 24,
    "is_disponible": false,
    "site_web": "guillaumecuriel.fr",
    "prix": "0",
    "annonces": [
        {
            "id": 10,
            "titre": "Développeur Symfony",
            "description": "Nous cherchons, un développeur Back-end Symfony pour élaborer un espace d'administration",
            "localisation": "0",
            "adresse": "3 rue de la paix, Paris",
            "remuneration": 350,
            "date_debut": "2019-06-20T00:00:00+00:00",
            "date_fin": "2019-10-20T00:00:00+00:00",
            "date_publication": "2019-04-14T16:21:28+00:00",
            "formation": "BAC+4",
            "entreprise": "Samsung",
            "competence": "Symfony2 & 3, SQL, Twig, Javascript, CSS, HTML"
        },
        {
            "id": 12,
            "titre": "Développeur Angular",
            "description": "Nous cherchons un développeur Front-end Angular pour intégrer des maquettes",
            "localisation": "0",
            "adresse": "3 rue de la paix, Paris",
            "remuneration": 450,
            "date_debut": "2019-06-20T00:00:00+00:00",
            "date_fin": "2019-10-20T00:00:00+00:00",
            "date_publication": "2019-04-14T16:21:28+00:00",
            "formation": "BAC+3",
            "entreprise": "Apple",
            "competence": "Angular2+, Javascript, CSS, HTML"
        },
        {
            "id": 13,
            "titre": "Analyste Big data",
            "description": "Nous cherchons un analyste big data pour répondre aux besoins de nos clients pour un projet",
            "localisation": "0",
            "adresse": "3 rue de la paix, Paris",
            "remuneration": 500,
            "date_debut": "2019-06-20T00:00:00+00:00",
            "date_fin": "2019-10-20T00:00:00+00:00",
            "date_publication": "2019-04-14T16:21:28+00:00",
            "formation": "BAC+5",
            "entreprise": "Altran",
            "competence": "Data analyste, data science, python"
        }
        ]
    }

    id;
    canditaturesEnCours = 1;
    offresEnCours = 2;
    job = "Developpeur Full Stack / Intégrateur";

    constructor(private router: Router , private networkService: NetworkService, private http: HttpClient, public storage: Storage) {

    }
    ngOnInit() {

    }

}
