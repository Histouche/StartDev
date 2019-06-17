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

    user;

    ava = false;
    id;
    canditaturesEnCours = 1;
    offresEnCours = 2;
    job = "Developpeur Full Stack / Intégrateur";

    constructor(private router: Router , private networkService: NetworkService, private http: HttpClient, public storage: Storage) {

    }
    ngOnInit() {

    }

}
