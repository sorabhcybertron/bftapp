import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ServerCallsService } from '../server-calls.service'
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormInputService } from '../form-input-generator/form-input-service';
@Component({
  selector: 'app-intrestform',
  templateUrl: './intrestform.component.html',
  styleUrls: ['./intrestform.component.css'],
  providers:  [FormInputService]
})
export class IntrestformComponent implements OnInit {
  formloaded: boolean = false;
  formid    :any;
  submiting : boolean = false;
  background:any;
  errorMessage:string = ''; 
  form_name :string='';
  showStep  : any = 0;
  formsInputs : any[] = [];
  subVals   : any;
  subForm   : any;
  inrested_in_plans  = new Array();
  allPlans : any = {};
  allServices : any= {};
  allPlanLinks : any = {};

  constructor(private toastr:ToastrService,public forminputsrvc: FormInputService,public router: Router,
          public route: ActivatedRoute ,public servercall:ServerCallsService) { 
    this.formid = this.route.params["_value"].formid;
    this.form_name='Loading ...';
  }

  ngOnInit() {
    setTimeout(()=>{
        this.subForm  = JSON.parse(this.servercall.getLocalStorage("submittedVal"));
        this.background = this.servercall.cleanURL(`url(${this.subForm.background_url})`,'style');
        this.subVals  = this.subForm.data;
        if(this.subVals){
          this.getServerForm(this.formid);
          this.showWhichStep(this.showStep);
        }else{
          this.toastr.success('Oops!', 'Something went wrong');
          this.router.navigate(['/dashboard/']);
        }
    },100);
  }

   showWhichStep(step){
    this.showStep = step;
    window.scrollTo(0, 0);
  }

  getServerForm(formid){
    // formid = 'form'+formid;
    let pdata = {};
    /*New Intrest Form*/
    
    this.servercall.postCall(this.servercall.baseUrl+"get/form"+formid+".json",pdata).subscribe(
     resp =>{ 
       if(resp['form']){
         // this.background = this.servercall.cleanURL(`url(${resp['form']['background_image']})`,'style');
         this.form_name = resp['form']['name'];
         if(resp['form']['form']){
           resp['form']['form'] = JSON.parse(resp['form']['form']); 
           const allOptions: any[] = [];
           resp['form']['form'].forEach(inputs =>{
             inputs.forEach(input => {
               let planName = ['good-plan', 'better-plan', 'best-plan'];
               let servicesName = ['good-services', 'better-services', 'best-services'];
               let linkName = ['good-plan-link', 'better-plan-link', 'best-plan-link'];

               if(planName.includes(input.name)){
                 input.values.map(option => {
                   allOptions.push(option);
                 });
                 let opt = {
                             options : input.values,
                              enrollPrice: input.className.split('-')[0], 
                              dropPrice : input.className.split('-')[1],
                            };
                 if(input.name == 'good-plan'){
                   this.allPlans['good-plan'] = opt;
                 }
                 if(input.name == 'better-plan'){
                   this.allPlans['better-plan'] = opt;
                 }
                 if(input.name == 'best-plan'){
                   this.allPlans['best-plan'] = opt;
                 }
               }
               if(servicesName.includes(input.name)){
                 if(input.name == 'good-services'){
                   this.allServices['good-services'] = input.values;
                 }
                 if(input.name == 'better-services'){
                   this.allServices['better-services'] = input.values;
                 }
                 if(input.name == 'best-services'){
                   this.allServices['best-services'] = input.values;
                 }
               }
               if(linkName.includes(input.name)){
                 if(input.name == 'good-plan-link'){
                   this.allPlanLinks['good-plan-link'] = input.values;
                 }
                 if(input.name == 'better-plan-link'){
                   this.allPlanLinks['better-plan-link'] = input.values;
                 }
                 if(input.name == 'best-plan-link'){
                   this.allPlanLinks['best-plan-link'] = input.values;
                 }
               }
             });
           });
          let inputForForm = [{ name: "inrested_in_plans", type: "checkbox-group", values: allOptions }];
          this.formsInputs.push(this.forminputsrvc.getFormdata(inputForForm,'notreal')); 
          this.formloaded = true;
        }else{
           console.log("No Fileds");
        }
      }else{
           console.log("No Form");
      } 
     },
     error => {
         this.errorMessage = 'Error while Loading For! Try Again.';
        console.log(error);
     }
    );
  }

  checkConditons(input){
    // console.log(input);
    if(input.conditions !== undefined && input.conditions !== null && input.conditions !== "" && input.conditions.length > 0){
        return  this.deepIndexOf(input.conditions[0]["onElement"],input.conditions[0]["value"]);
    }else{
      return true;
    }
  }

  deepIndexOf(obj,keytofind) {
    for(var arrIndex=0; arrIndex < this.subVals.length; arrIndex++){
        if(this.subVals[arrIndex][obj] !== undefined){
          if(typeof(this.subVals[arrIndex][obj]) == 'string' && this.subVals[arrIndex][obj] == keytofind){
            return true;
          }else if((keytofind == '' && this.subVals[arrIndex][obj] == [] ) || this.subVals[arrIndex][obj].includes(keytofind)){
            return true;
          }
        }else if(this.subVals[arrIndex][obj+'[]'] !== undefined){
          if(typeof(this.subVals[arrIndex][obj+'[]']) == 'string' && this.subVals[arrIndex][obj+'[]'] == keytofind){
              return true;
          }else if((keytofind === "" && this.subVals[arrIndex][obj+'[]'].length === 0 ) || this.subVals[arrIndex][obj+'[]'].includes(keytofind)){
              return true;
          }
        }
    }
    return false;
  }

  IntonCheckChange(isChecked: boolean,val,tg){
    if (isChecked) {
      if(tg == 'inrested_in_plans[]'){
        this.inrested_in_plans.push(val);
      }
    } else {
      if(tg == 'inrested_in_plans[]'){
        let index = this.inrested_in_plans.findIndex(x => x == val)
        this.inrested_in_plans.splice(index,1);
      }
    }
  }

  onCheckChange(isChecked: boolean,val,tg) {
    if (isChecked) {
      if(tg == 'inrested_in_plans[]'){
        this.inrested_in_plans.push(val);
      }
    } else {
      if(tg == 'inrested_in_plans[]'){
        let index = this.inrested_in_plans.findIndex(x => x == val)
        this.inrested_in_plans.splice(index,1);
      }
    }
  }


  showPlans(){
    if(this.inrested_in_plans){
      this.subForm['inrested_in_plans'] = this.inrested_in_plans;
    }else{
      this.subForm['inrested_in_plans'] = [];
    }
    if(this.allPlanLinks){
      this.allPlans['good-plan']['link'] = this.allPlanLinks['good-plan-link'];
      this.allPlans['better-plan']['link'] = this.allPlanLinks['better-plan-link'];
      this.allPlans['best-plan']['link'] = this.allPlanLinks['best-plan-link'];
    }
    this.servercall.setLocalStorage('submittedVal',JSON.stringify(this.subForm));
    this.servercall.setLocalStorage('allPlans',JSON.stringify(this.allPlans));
    this.servercall.setLocalStorage('allServices',JSON.stringify(this.allServices));
    this.router.navigate(['/plans/']);
  }

}
