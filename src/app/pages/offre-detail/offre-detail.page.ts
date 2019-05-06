import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.page.html',
  styleUrls: ['./offre-detail.page.scss'],
})
export class OffreDetailPage implements OnInit {

  annonce;

  constructor(private router: ActivatedRoute) { 
    this.router.queryParams.subscribe(params=> {
      this.annonce = params;
    })
  }

  ngOnInit() {
    console.log(this.annonce);
  }

}
