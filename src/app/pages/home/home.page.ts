import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NetworkService } from 'src/app/services/network/network.service';
import { urlAPI } from './../../services/url-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  annonces: any;

  constructor(private router: Router , private networkService: NetworkService, private http:HttpClient){
  } 
  ngOnInit(){
    this.networkService.getAnnonces().then((liste) => {
        console.log('annonces', liste);
    });
  }

  goToAnnonce(annonce){
    let navigationExtras: NavigationExtras = {
      queryParams: annonce
  };
    this.router.navigate(['/offre-detail'], navigationExtras);
  }
}
