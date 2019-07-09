import { Component, OnInit,ViewChild,ChangeDetectorRef, ViewChildren,QueryList} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ServerCallsService } from '../server-calls.service';
import { AbstractControl,FormBuilder, FormGroup, Validators,ValidatorFn,FormControl,FormArray} from '@angular/forms';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { FormInputGeneratorBase } from '../form-input-generator/form-input-generator-base';
import { FormInputService } from '../form-input-generator/form-input-service';


declare var cordova;


@Component({
  selector: 'app-new-visitorwalk',
  templateUrl: './new-visitorwalk.component.html',
  styleUrls: ['./new-visitorwalk.component.css'],
  providers:  [FormInputService]
})
export class NewVisitorwalkComponent implements OnInit {
  @ViewChildren(SignaturePad) signaturePad: QueryList<SignaturePad>;

  signaturePadCount = 0;
  signaturemessage : string = '';
  formloaded: boolean = false;
  formid:any;
  errorMessage:string;
  submiterror = false;
  submiting = false;
  background:any;
  form_name:string='';
  thankyouform:any;
  userInfo : any;
  showStep : any = 0;
  gender : boolean = false;
  termConditin:boolean = false ; 
  memberBefore:boolean = false;
  formInputGroup : FormGroup;
  screens: any[] = [];
  formsInputs : any[] = [];
  inputs: any[];
  formdetail : any;

  constructor(private toastr:ToastrService,private cdr: ChangeDetectorRef,public forminputsrvc: FormInputService,public router: Router,public route: ActivatedRoute ,public servercall:ServerCallsService,public formBuilder: FormBuilder) { 
    this.formid = this.route.params["_value"].formid;
    // this.background = this.servercall.cleanURL(`url(assets/images/LoadingBackground.gif)`,'style')
    this.form_name='Loading ...';
    this.errorMessage =  '';
  }

  ngOnInit() {
      this.formInputGroup = this.formBuilder.group({
        formName : '',
        formbackground : '',
        thankyouform : '',
        screens: this.formBuilder.array([])
      });
      this.getServerForm(this.formid);
  		this.showWhichStep(this.showStep);
  }

  showWhichStep(step,back?:boolean){
    if(step !== 0 && !back){
      let screen =  this.formInputGroup['controls']['screens']['controls'][step-1];
      if(this.formsInputs[step-1]){
        this.formsInputs[step-1].forEach(input=>{
            if(input.conditions !== undefined && input.conditions !== null && input.conditions !== "" && input.conditions.length > 0){
              if(!this.checkConditons(input)){
                 let cont = this.formInputGroup.get(['screens',step-1,input.key]);
                  cont.clearValidators();
              }else{
                  this.addValidators(input,this.formInputGroup.get(['screens',step-1,input.key]));
              }
                  this.formInputGroup.get(['screens',step-1,input.key]).updateValueAndValidity();
            }
        });
      }
      let control_key = Object.keys(screen["controls"]);
          control_key.forEach(control=>{
          screen.get(control).markAsDirty();
      });
      if(screen.valid){
        this.showStep = step;
        window.scrollTo(0, 0);
      }  

    } else if(back){
        this.showStep = step;
        window.scrollTo(0, 0);
    }
  }
  
  opencal(id){
    id.open();
  }

addValidators(input,control){
    switch(input['controlType']) {
        case 'textbox' :
            if(input['type'] == 'tel'){
              if(input['required']){
                control.setValidators(Validators.compose([Validators.required,this.validatorNumber()]));
              }else{
                control.setValidators(Validators.compose([this.validatorNumber()]));
              }
            }else if(input['type'] == 'email'){
              if(input['required']){
                control.setValidators(Validators.compose([Validators.required,this.validatorEmail()]));
              }else{
                control.setValidators(Validators.compose([this.validatorEmail()]));
              }
            }else if(input['type'] == 'password'){
              if(input['required']){
                control.setValidators(Validators.compose([Validators.required,this.validatorPassword()]));
              }else{
                control.setValidators(Validators.compose([this.validatorPassword()]));
              }
            }else{ 
              if(input['required']){
                control.setValidators(Validators.compose([Validators.required]));
              }
            }
            break;
        case 'number':
              if(input['required']){
                control.setValidators(Validators.compose([Validators.required,this.validatorNumber()]));
              }else{
                control.setValidators(Validators.compose([this.validatorNumber()]));
              }
            break;

        case 'header': break;
        case 'paragraph': 
              if(input['type'] == 'canvas' && input['required']){
                control.setValidators(Validators.compose([Validators.required]));
              }
            break;

        default:
            if(input['required']){
              control.setValidators(Validators.compose([Validators.required]));
            }
              
    }
    return true;
  }

  getServerForm(formid){
    formid = 'form'+formid;
    let pdata = {};
    this.servercall.postCall(this.servercall.baseUrl+"get/"+formid+".json",pdata).subscribe(
         resp =>{ 
           console.log(resp);
           if(resp['form']){
             this.background = this.servercall.cleanURL(`url(${resp['form']['background_image']})`,'style');
             this.form_name = resp['form']['name'];
             this.thankyouform = (resp['form']['thankyou_form_id']) ? resp['form']['thankyou_form_id']: null;
             this.formdetail = resp;
             if(resp['form']['form']){
               resp['form']['form'] =JSON.parse(resp['form']['form']);
               // //console.log();
               resp['form']['form'].forEach(input => {
                    (this.formInputGroup.get('screens') as FormArray ).push(this.toFormGroup(this.forminputsrvc.getFormdata(input,'real')));
                     this.formsInputs.push(this.forminputsrvc.getFormdata(input,'notreal'));   
                });         
                // console.log(this.formInputGroup); 
                this.formloaded = true;
             }else{
               //console.log("no Fileds");
             }
           }else{
               //console.log("No Form");
           }
         },
         error => {
             this.errorMessage = 'Error while Loading For! Try Again.';
            console.log(error);
         } 
    );
  }

  Onsubmit(){
    //console.log(this.formInputGroup);
    this.submiterror = false;
    this.formInputGroup.controls['screens']['controls'].forEach(screen=>{
           let control_key = Object.keys(screen["controls"]);
          control_key.forEach(control=>{
              screen.get(control).markAsDirty();
          });
    });

    if(this.formInputGroup.status == 'VALID'){
      this.submiting = true;
      const pData = this.prepareSave(); 
      this.servercall.postCall(this.servercall.baseUrl+"form"+this.formid+".json",pData).subscribe( 
            resp =>{
               if(resp['json']['status']){
                 this.toastr.success('Thank You', 'Your Data has been saved',{timeOut: 2000});
                 if(this.thankyouform){
                   let od = {
                               background: this.background,
                               background_url: this.formdetail.form.background_image,
                               form_name : this.form_name,
                               data : this.formInputGroup.value['screens'],
                               forms : {
                                         general :this.formdetail.form.id,
                                         thankyou:this.formdetail.form.thankyou_form_id,
                                         intrest: this.formdetail.form.interest_form_id
                                       }
                            };
                   this.servercall.setLocalStorage('submittedVal',JSON.stringify(od));
                   this.router.navigate(['/thankyou/'+this.thankyouform]);
                 }else{
                   this.router.navigate(['/dashboard/']);
                 }
               } else {
                 this.submiting = false;
                 this.submiterror = true;
                 this.toastr.error('Something went wrong!', 'Couldn`t save your data.',{timeOut: 2000});
               }
           },
           error => {
              this.submiting = false;
              this.submiterror = true;
              this.errorMessage = 'Something went wrong! Please Try again later.';
              console.log(error);
           }  
        );
      }else{
             this.errorMessage = 'You have missed some required information.';
      }
  }


  toFormGroup(inputs: FormInputGeneratorBase<any>[] ) {
    let group: any = {};
    inputs.forEach(input => {
      if(input.controlType !== 'header' && input.controlType !== 'Image' ){
        if(input.controlType ==  'paragraph' && input['type'] == 'canvas'){
          group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required]))
                                              : new FormControl(input.value || '');
        }else if(input.controlType == 'checkbox' ){
          // const checkoptions = input['options'].map(opt=>{ return new FormControl(opt.selected)});                
          // console.log(input);
          let checkoptions : any = (input.value)?input.value:[];

          group[input.key] = input.required ? this.formBuilder.array(checkoptions,Validators.compose([Validators.required]))
                                : this.formBuilder.array(checkoptions);
          // group[input.key] = input.required ? new FormArray(checkoptions,this.minSelectedCheckboxes(1))
          //                    : new FormArray(checkoptions);
        }else{

          if(input.controlType == 'textbox'){
            if(input['type'] == 'tel'){
              group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required,this.validatorNumber()]))
                                              : new FormControl(input.value || '',Validators.compose([this.validatorNumber()])); 
            }else if(input['type'] == 'email'){
              group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required,this.validatorEmail()]))
                                              : new FormControl(input.value || '',Validators.compose([this.validatorEmail()]));
            }else if(input['type'] == 'password'){
              group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required,this.validatorPassword()]))
                                              : new FormControl(input.value || '', Validators.compose([this.validatorPassword()]));
            }else{
                group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required]))
                                              : new FormControl(input.value || '');  
            }
          }else if(input.controlType == 'number'){
            group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required,this.validatorNumber()]))
                                              : new FormControl(input.value || '',Validators.compose([this.validatorNumber()])); 
          }else{
                group[input.key] = input.required ? new FormControl(input.value || '', Validators.compose([Validators.required]))
                                              : new FormControl(input.value || '');
          }
        }

      }
    });
    return new FormGroup(group);
  }

  onFileChange(event,group,tg) {
    if(event.target.files.length > 0) {
      let reader = new FileReader();
      let file = event.target.files[0];
      this.formInputGroup.get(['screens',group,tg]).setValue(file);
    }
  }

  onCheckChange(isChecked: boolean,val,group,tg) {
    const checkgroupFormArray = <FormArray>this.formInputGroup.get(['screens',group,tg]);
    if (isChecked) {
      if(tg == 'sex[]'){
        checkgroupFormArray.removeAt(0);
        checkgroupFormArray.push(new FormControl('Male'));
      }else{
        checkgroupFormArray.push(new FormControl(val));
      }
    } else {
      if(tg == 'sex[]'){
        checkgroupFormArray.removeAt(0);
        checkgroupFormArray.push(new FormControl('Female'));
      }else{ 
        let index = checkgroupFormArray.controls.findIndex(x => x.value == val)
        checkgroupFormArray.removeAt(index);
      }
    }
        // console.log(checkgroupFormArray,tg);
  }


  prepareSave(): any {
    var preparedform = new FormData();
    this.formInputGroup.value['screens'].forEach(screen=>{
          let scren = Object.keys(screen);
          scren.forEach(inp=>{
            preparedform.append(inp,screen[inp]);
          });
    });
    return preparedform;
  }



/************Conditional Rules*******************/
  

  deepIndexOf(arr, obj,keytofind,toaffect) {
    for(var arrIndex=0; arrIndex < arr.length; arrIndex++){
        if(arr[arrIndex][obj] !== undefined){
          if(typeof(arr[arrIndex][obj]) == 'string' && arr[arrIndex][obj] == keytofind){
            return true;
          }else if((keytofind == '' && arr[arrIndex][obj] == [] ) || arr[arrIndex][obj].includes(keytofind)){
            return true;
          }
        }else if(arr[arrIndex][obj+'[]'] !== undefined){
          if(typeof(arr[arrIndex][obj+'[]']) == 'string' && arr[arrIndex][obj+'[]'] == keytofind){
              return true;
          }else if((keytofind === "" && arr[arrIndex][obj+'[]'].length === 0 ) || arr[arrIndex][obj+'[]'].includes(keytofind)){
              return true;
          }
        }
    }
    return false;
  }

  checkConditons(input){
    // console.log(input);
    if(input.conditions !== undefined && input.conditions !== null && input.conditions !== "" && input.conditions.length > 0){
        return  this.deepIndexOf(this.formInputGroup.value['screens'],input.conditions[0]["onElement"],input.conditions[0]["value"],input.key);
    }else{
      return true;
    }
  }

/************Signature Pad*****************/

 ngAfterViewInit() {
   this.cdr.detectChanges();
   if(this.signaturePad){
      this.signaturePad.forEach(signature=>{
        signature.set('minWidth', 5); 
        signature.clear(); 
      });
   }
  }


  clearSignature(indx,screen,controlname){
      //console.log(this.signaturePad['_results']);
      this.formInputGroup.get(['screens',screen,controlname]).setValue('');
      this.formInputGroup.get(['screens',screen,controlname]).markAsDirty();
      this.signaturePad['_results'][0].clear();
      this.signaturemessage = '';
  }
  
  signatureSave(indx,screen,controlname){
      if(!this.signaturePad['_results'][0].isEmpty()){
        let data = this.signaturePad['_results'][0].toDataURL();
        //console.log(data);
        this.formInputGroup.get(['screens',screen,controlname]).setValue(data);
        this.formInputGroup.get(['screens',screen,controlname]).markAsDirty();
        this.signaturemessage = 'saved';
      }else{
        this.formInputGroup.get(['screens',screen,controlname]).markAsDirty();
        console.log('Empty Signature');
        this.signaturemessage = 'Empty';
      }
  }  

  
  


/************Custom Validators*****************/
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }


  validatorEmail(){
    const validator: ValidatorFn = (control: FormControl) => {
      let val=null;
      if((control.value !== undefined && control.value !== null && control.value !== "")){
          val = false;
          let ptrn = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          val = ptrn.test(control.value) ? null : {'invalidEmail': true};
      }
      return val;
    };
    return validator;
  }

  validatorNumber(){
    const validator: ValidatorFn = (control: FormControl) => {
      let val=null;
      if((control.value !== undefined && control.value !== null && control.value !== "")) {
          val = false;
          let ptrn = /^-?(0|[1-9]\d*)?$/;
          val = ptrn.test(control.value) ? null : {'invalidNumber': true};
      }
      return val;
    };
    return validator;
  }

  


  validatorPassword(){
    const validator: ValidatorFn = (control: FormControl) => {
      let val=null;
      if((control.value !== undefined && control.value !== null && control.value !== "")) {
          val = false;
          // '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
          let ptrn = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}/;
          val = ptrn.test(control.value) ? null : {'invalidPassword': true};
      }
      return val;
    };
    return validator;
  }


/***********Cordova date Picker*****************/
  
  formatDte(what,date){
    if(what == 'time'){
        let dt = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        return dt ;
    }else{
        let dt = (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
        return dt;
    }
  }


  openDatepicker(indx,name,md,dt = new Date(),min=null,max=null){
    this.core_date_pick_show(indx,name,md,dt,min,max,this);
  }

  core_date_pick_show(indx,name,md,dt,min,max=null,ngself){
    cordova.plugins.DateTimePicker.show({
      mode: md,
      date: dt,
      allowOldDates: false,
      allowFutureDates: true,
      minDate: min,
      maxDate: max,
      minuteInterval: 1,
      locale: "EN",
      okText: "Select",
      cancelText: "Cancel",
      android: {
        theme: 16974126, // Theme_DeviceDefault_Dialog
        calendar: false,
        is24HourView: true
      },
      success: function(newDate) {
        // Handle new date.
        //console.info(newDate);
        if(md = 'date'){
            ngself.formInputGroup.get(['screens',indx,name]).setValue(ngself.formatDte('date',newDate));
        }else if(md = 'time'){
            ngself.formInputGroup.get(['screens',indx,name]).setValue(ngself.formatDte('date',newDate));
        }else if(md = 'datetime'){
            ngself.formInputGroup.get(['screens',indx,name]).setValue(newDate);
        }
        return  newDate;
      },
      cancel: function() {
        console.info("Cancelled");
        return false;
      },
      error: function (err) {
        // Handle error.
        console.error(err);
      }
    });
  }

  goBackToHome(){
    this.router.navigate(['/dashboard/']);
  }
}
