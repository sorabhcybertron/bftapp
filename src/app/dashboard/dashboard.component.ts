import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';

import { ServerCallsService } from '../server-calls.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formList : any ;
  constructor(public router: Router ,public servercall:ServerCallsService) {

  }

  ngOnInit() {
  	this.loadForms();
  }

  loadForms(){
	  	let pdata = {};
	    this.servercall.postCall(this.servercall.baseUrl+"forms/listing.json",pdata).subscribe(
	         resp =>{ 
	            this.formList = resp["forms"];
	            console.log(this.formList);
	         },
	         error => {
	            console.log(error);
	         } 
	    );
  	}

}
