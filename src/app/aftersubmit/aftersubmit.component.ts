import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ServerCallsService } from '../server-calls.service'
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormInputService } from '../form-input-generator/form-input-service';
@Component({
  selector: 'app-aftersubmit',
  templateUrl: './aftersubmit.component.html',
  styleUrls: ['./aftersubmit.component.css'],
  providers:  [FormInputService]
})
export class AftersubmitComponent implements OnInit {
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
  constructor(private toastr:ToastrService,public forminputsrvc: FormInputService,public router: Router,public route: ActivatedRoute ,public servercall:ServerCallsService,) { 
    this.formid = this.route.params["_value"].formid;
    this.form_name='Loading ...';
  }

  ngOnInit() {
    setTimeout(()=>{
        this.subForm  = JSON.parse(this.servercall.getLocalStorage("submittedVal"));
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
    formid = 'form'+formid;
    let pdata = {};
    this.servercall.postCall(this.servercall.baseUrl+"get/"+formid+".json",pdata).subscribe(
         resp =>{
           if(resp['form']){
             this.background = this.servercall.cleanURL(`url(${resp['form']['background_image']})`,'style');
             this.form_name = resp['form']['name'];
             if(resp['form']['form']){
             	resp['form']['form']  =JSON.parse(resp['form']['form']);    
	            resp['form']['form'].forEach(input =>{
                   this.formsInputs.push(this.forminputsrvc.getFormdata(input,'notreal'));   
              	}); 
	            this.formloaded = true;
              this.changethevalues(this.formsInputs);
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

  changethevalues(arr){
    for(var arrIndex=0; arrIndex < arr.length; arrIndex++){
      for(var i=0; i < arr[arrIndex].length; i++){
          let prop = 'label'
          if(arr[arrIndex][i]['controlType'] == "checkbox"){
            var opt = this.FindVal(arr[arrIndex][i]['key']);
            arr[arrIndex][i]['options'] = [];
            opt.forEach(op=>{ arr[arrIndex][i]['options'].push({
                'key'  : '',
                'label': op,
                'selected' : true,
                'value' : op
              }) });
          }else{
            if(arr[arrIndex][i]['controlType'] == "Image"){ prop = 'value';}
            if(arr[arrIndex][i][prop]){
               var tochange = arr[arrIndex][i][prop].match(/\$\b[a-z,A-Z,0-9,_,-]*\b\$/g);
               if(tochange){
                 tochange.forEach(word => {
                   var newword = this.FindVal(word.replace(/\$/g, ''));
                   arr[arrIndex][i][prop] = arr[arrIndex][i][prop].replace(word, newword);
                 });
               } 
            }
        } 
      }
    }
  }

  FindVal(obj) {
    for(var arrIndex=0; arrIndex < this.subVals.length; arrIndex++){
        if(this.subVals[arrIndex][obj] !== undefined){
            return this.subVals[arrIndex][obj];
        }else if(this.subVals[arrIndex][obj+'[]'] !== undefined){
            return this.subVals[arrIndex][obj+'[]'];
        }
    }
    return false;
  }

  showPlans(){
    if(this.subForm.forms.intrest)
       this.router.navigate(['/intrests/'+this.subForm.forms.intrest]);
    else
       this.router.navigate(['/plans/']);
  }

}
