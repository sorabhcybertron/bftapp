import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ServerCallsService } from '../server-calls.service'


declare var cordova;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})


export class PlansComponent implements OnInit {
	background:any;
  subForm : any;
  allPlans: any;
  allServices: any;
  planType:string="ach" ;
  serviceArray : any  = [];
  newPlans = {
      "basic":{
          'ach': {"price":0,"dollar":0,"cents":0,"enrollment":0,"link":""},
          'credit': {"price":0,"dollar":0,"cents":0,"enrollment":0,"link":""},
          'services': [],
          'recommended':false
        },
      "better":{
          'ach': {"price":0,"dollar":0,"cents":0,"enrollment":0,"link":""},
          'credit': {"price":0,"dollar":0,"cents":0,"enrollment":0,"link":""},
          'services': [],
          'recommended':false
        },
      "best":{
          'ach': {"price":0,"dollar":0,"cents":0,"enrollment":0,"link":""},
          'credit': {"price":0,"dollar":0,"cents":0,"enrollment":0,"link":""},
          'services': [],
          'recommended':false
        },
    };

  constructor(public servercall:ServerCallsService, public router: Router,public route: ActivatedRoute) {
    this.subForm  = JSON.parse(this.servercall.getLocalStorage("submittedVal"));
    this.background = this.servercall.cleanURL(`url(${this.subForm.background_url})`,'style');
    this.allPlans = JSON.parse(this.servercall.getLocalStorage("allPlans"));
    this.allServices = JSON.parse(this.servercall.getLocalStorage("allServices"));
    if(this.allServices){
      if(this.allServices['good-services']){
      this.serviceArray.push(...this.allServices['good-services']);
      }
      if(this.allServices['better-services']){  
      this.serviceArray.push(...this.allServices['better-services']);
      this.allServices['better-services'] = [...this.allServices['good-services'],...this.allServices['better-services']];
      }
      if(this.allServices['best-services']){
        this.serviceArray.push(...this.allServices['best-services']);
        this.allServices['best-services'] = [...this.allServices['good-services'],...this.allServices['better-services'],...this.allServices['best-services']];
      }
    }
    if(this.allPlans){
      if(this.allPlans['best-plan']){
        this.newPlans.best.ach.enrollment = this.allPlans['best-plan']['enrollPrice'];
        this.newPlans.best.credit.enrollment = this.allPlans['best-plan']['dropPrice'];
        let maxBest = 0;
        this.allPlans['best-plan']['options'].filter(x => {
          maxBest = (parseFloat(x.value) > maxBest) ? parseFloat(x.value) : maxBest;
        });
        this.allPlans['best-plan']['link'].forEach(x => {
          if(x['label'] == 'ACH'){
            this.newPlans.best.ach.link = x.value;
          }
          if(x['label'] == 'CARD'){
            this.newPlans.best.credit.link = x.value;
          }
        });
        this.newPlans.best.ach.dollar = this.filertDollarCents(maxBest, true);
        this.newPlans.best.ach.cents = this.filertDollarCents(maxBest, false);
        this.newPlans.best.credit.dollar = this.filertDollarCents(maxBest, true);
        this.newPlans.best.credit.cents = this.filertDollarCents(maxBest, false);
      }
      if(this.allPlans['better-plan']){
        this.newPlans.better.ach.enrollment = this.allPlans['better-plan']['enrollPrice'];
        this.newPlans.better.credit.enrollment = this.allPlans['better-plan']['dropPrice'];
        let maxBetter = 0;
        this.allPlans['better-plan']['options'].filter(x => {
          maxBetter = (parseFloat(x.value) > maxBetter) ? parseFloat(x.value) : maxBetter;
        });
        this.allPlans['better-plan']['link'].forEach(x => {
          if(x['label'] == 'ACH'){
            this.newPlans.better.ach.link = x.value;
          }
          if(x['label'] == 'CARD'){
            this.newPlans.better.credit.link = x.value;
          }
        });
        this.newPlans.better.ach.dollar = this.filertDollarCents(maxBetter, true);
        this.newPlans.better.ach.cents = this.filertDollarCents(maxBetter, false);
        this.newPlans.better.credit.dollar = this.filertDollarCents(maxBetter, true);
        this.newPlans.better.credit.cents = this.filertDollarCents(maxBetter, false);
      }
      if(this.allPlans['good-plan']){
        this.newPlans.basic.ach.enrollment = this.allPlans['good-plan']['enrollPrice'];
        this.newPlans.basic.credit.enrollment = this.allPlans['good-plan']['dropPrice'];
        let maxGood = 0;
        this.allPlans['good-plan']['options'].filter(x => {
          maxGood = (parseFloat(x.value) > maxGood) ? parseFloat(x.value) : maxGood;
        });
        this.allPlans['good-plan']['link'].forEach(x => {
          if(x['label'] === 'ACH'){
            this.newPlans.basic.ach.link = x.value;
          }
          if(x['label'] === 'CARD'){
            this.newPlans.basic.credit.link = x.value;
          }
        });
        this.newPlans.basic.ach.dollar = this.filertDollarCents(maxGood, true);
        this.newPlans.basic.ach.cents = this.filertDollarCents(maxGood, false);
        this.newPlans.basic.credit.dollar = this.filertDollarCents(maxGood, true);
        this.newPlans.basic.credit.cents = this.filertDollarCents(maxGood, false);
      }
    }
  }

  ngOnInit() {
  this.getPlans();
  }

  changePlantype(type){
    this.planType = type;
  }

  goBackHome() {
    // this.router.navigate(['/dashboard/']);
    this.selectedPlans();
  }

  goBackInterest(){
    if (this.subForm.forms.intrest){
       this.router.navigate(['/intrests/'+this.subForm.forms.intrest]);
    }
  }

  filertDollarCents(value, dollar = true){
    if(value){
      let o = value.toString().split('.');
      if(o.length > 0){
        if(dollar){
          return o[0]
        } else {
          return (o.length >= 2) ?  o[1]  : 0;
        }
      }
    }
  }

  getPlans(){
    let recommended = 'good-plan';
    if(this.subForm.inrested_in_plans && this.allPlans) {
      this.subForm.inrested_in_plans.forEach(intrest => {
        if(  
          this.allPlans['best-plan']['options'].find(plan => {
            return (plan['value'] == intrest['value'] 
                && plan['label'] == intrest['label']) ? true : false;
          })
          ){
            recommended = 'best-plan'
        } else if(
            this.allPlans['better-plan']['options'].find(plan => {
              return (plan['value'] == intrest['value']
                  && plan['label'] == intrest['label']) ? true : false;
            })
          ){
          recommended = (recommended == 'best-plan') ? recommended : 'better-plan';
        } else if(
            this.allPlans['good-plan']['options'].find(plan => {
              return (plan['value'] == intrest['value'] 
                  && plan['label'] == intrest['label']) ? true : false;
            })
          ){
        recommended = (recommended == 'best-plan' || recommended == 'better-plan') ? recommended : 'good-plan';
        }
      });
      switch (recommended) {
        case 'best-plan':
          this.newPlans.basic.recommended = false;
          this.newPlans.better.recommended = false;
          this.newPlans.best.recommended = true;
          break;
        case 'better-plan' :
          this.newPlans.basic.recommended = false;
          this.newPlans.better.recommended = true;
          this.newPlans.best.recommended = false;
          break;
        default:
          this.newPlans.basic.recommended = true;
          this.newPlans.better.recommended = false;
          this.newPlans.best.recommended = false;
          break;
      }
    }
  }

  doNewHaveService(plan,service){
    if(this.allServices[plan].find(x => { return (x.label == service) ? true : false;}))
      return true;
    else 
      return false;
  }

  selectedPlans(){
    let links:  any;
    if(this.newPlans.best.recommended){
      links = this.newPlans.best;
    }
    else if(this.newPlans.better.recommended){
      links = this.newPlans.better;
    }
    else if(this.newPlans.basic.recommended){
      links =  this.newPlans.basic;
    }
    if(this.planType == 'ach'){
      cordova.InAppBrowser.open(links['ach']['link']);
    } else {
      cordova.InAppBrowser.open(links['credit']['link']);
    }
  }
}
