import { Injectable }       from '@angular/core';

import { FormInputDropdownGenerator }  from './form-input-dropdown-generator';
import { FormInputGeneratorBase } from './form-input-generator-base'; 
import { FormInputTextboxGenerator }  from './form-input-textbox-generator';
import { FormInputCheckboxGenerator }  from './form-input-checkbox-generator';
import { FormHeaderGenerator }  from './form-header-generator';
import { FormParagraphGenerator }  from './form-paragraph-generator';
import { FormInputFileGenerator }  from './form-input-file-generator';
import { FormInputDateGenerator }  from './form-input-date-generator';
import { FormInputRadioGenerator }  from './form-input-radio-generator';
import { FormInputTextareaGenerator }  from './form-input-textarea-generator';
import { FormInputNumberGenerator }  from './form-input-number-generator';
import { FormInputButtonGenerator }  from './form-input-button-generator';
import { FormImageGenerator }  from './form-image-generator';

import { ServerCallsService } from '../server-calls.service';

 
@Injectable()
export class FormInputService {
  globalcanvasCount : number ; 
  constructor(public servercall:ServerCallsService){
    // console.log("hello Service");
    this.globalcanvasCount = 0;
  }

  getFormdata(resp,callType) {
    // console.log(resp);
    let inputs: FormInputGeneratorBase<any>[] = [];
    for(let inp of resp){
      let conditonalarray :{onElement: '',  value: ''}[] = [];
      /*****************/
        if(inp['onClickFieldName'] !== undefined && inp['onClickFieldName'] !== null && inp['onClickFieldName'] !== ''){
            conditonalarray.push({
                onElement:inp['onClickFieldName'] || '',
                value:inp['onClickFieldValue'] || ''
            });
            // console.log(conditonalarray);
        }else{
          conditonalarray = null;
        }
      /*****************/

      if(inp['type'] == 'text'){
          inputs.push(new FormInputTextboxGenerator({
              key: inp.name,
              label: inp.label,
              required: inp['required'] ? true : false,
              value: inp.value,
              type: inp.subtype,
              conditions:conditonalarray,
              order: 1
          }));
      }else if(inp["type"] == "textarea"){
          inputs.push(new FormInputTextareaGenerator({
              key: inp.name,
              label: inp.label,
              value: inp.value,
              required: inp['required'] ? true : false,
              type: 'textarea',
              conditions:conditonalarray,
              order: 1
          }));
      }else if(inp["type"] == "checkbox-group"){
          var opts : {key: string, value: string, selected:boolean, label:string}[] = [];
          var selectval : any = [];
          inp['values'].forEach(opt => {
              if(opt.selected){selectval.push(opt.value)};
              opts.push({
                key : opt.value,
                value : opt.value,
                selected :  opt.selected === undefined ? false : true,
                label: opt.label
              });
          });
          if(inp.name == 'sex') {
            if(selectval.length <= 0){
              selectval.push('Female');
            } 
          }
          else{
            selectval = (selectval.length >= 1)? selectval : [];
          }

          var lb = '';
          if(inp.label && inp.label !== 'undefined') lb = inp.label;
          inputs.push(new FormInputCheckboxGenerator({
              key: inp.name+'[]',
              label: lb,
              options: opts,
              value : selectval,
              type: 'checkbox',
              required: inp['required'] ? true : false,
              conditions:conditonalarray,
              order: 2
          }));
      }else if(inp["type"] == "radio-group"){
          var opts : {key: string, value: string, selected:boolean, label:string}[] = [];
          var selectval : any = null;
          inp['values'].forEach(opt => {
              if(opt.selected){selectval = opt.value};
              opts.push({
                key : opt.value,
                value : opt.value,
                selected :  opt.selected === undefined ? false : true,
                label: opt.label
              });
          });
          var lb = '';
          if(inp.label && inp.label !== 'undefined') lb = inp.label;
          inputs.push(new FormInputRadioGenerator({
              key: inp.name,
              label: lb,
              options: opts,
              value : (selectval)? selectval : '',
              type: 'radio',
              required: inp['required'] ? true : false,
              conditions:conditonalarray,
              order: 2
          }));
      }else if(inp["type"] == "select"){
          var opts : {key: string, value: string, selected:boolean, label:string}[] = [];
          var multi: boolean = inp['multiple'] ? true : false;
          var slectval :any = [];
          inp['values'].forEach(opt => {
              if(multi){ 
                if(opt.selected) slectval.push(opt.value);
              }else{
                if(opt.selected) slectval = [opt.value];
              }
              opts.push({
                key : opt.value+"option",
                value : opt.value,
                selected :  opt.selected === undefined ? false : true,
                label: opt.label
              });
          });
          inputs.push(new FormInputDropdownGenerator({
              key: (multi)?inp.name+'[]':inp.name,
              label: inp["label"],
              options: opts,
              value : slectval,
              type: 'select',
              required: inp['required'] ? true : false,
              conditions:conditonalarray,
              order: 2
          },multi));
      }else if(inp["type"] == "header"){
        inputs.push(new FormHeaderGenerator({
            key: 'header',
            label: inp.label,
            value: '',
            type : inp.subtype,
            conditions:conditonalarray,
            order: 1
        }));
      }else if(inp["type"] == "paragraph"){
        let canvCout :any = null;
        if(inp.subtype == 'canvas'){
          if(callType == 'real'){
            this.globalcanvasCount++;
          }
          canvCout = this.globalcanvasCount;
        }
        inputs.push(new FormParagraphGenerator({
            key: inp.name,
            label: inp.label,
            value: '',
            type : inp.subtype,
            canvasCount:canvCout,
            required : (inp.subtype == 'canvas') ? true : false,
            conditions:conditonalarray,                          
            order: 1
        }));
      }else if(inp["type"] == "file"){
        var multi: boolean = inp['multiple'] ? true : false;
        inputs.push(new FormInputFileGenerator({
            key: inp.name+'[]',
            label: inp.label,
            value: '',
            type : 'file',
            required: inp['required'] ? true : false,
            conditions:conditonalarray,
            order: 1
        },multi));
      }else if(inp["type"] == "date"){
        inputs.push(new FormInputDateGenerator({
            key: inp.name,
            label: inp.label,
            value: (inp.value) ? inp.value:'',
            type : 'date',
            required: inp['required'] ? true : false,
            conditions:conditonalarray,
            order: 1
        }));
      }else if(inp["type"] == "number"){
        inputs.push(new FormInputNumberGenerator({
            key: inp.name,
            label: inp.label,
            value: inp.value,
            max : (inp['max']) ? inp['max']: null,
            min:(inp['min']) ? inp['min'] : null,
            step:(inp['step']) ? inp['step'] :null,
            type : 'number',
            required: inp['required'] ? true : false,
            conditions:conditonalarray,
            order: 1
        }));
      }else if(inp["type"] == "button"){
        inputs.push(new FormInputButtonGenerator({
            key: inp.name,
            label: inp.label,
            type : inp.subtype,
            conditions:conditonalarray,
            order: 1
        }));
      }else if(inp["type"] == "Image"){
        inputs.push(new FormImageGenerator({
            key: inp.name,
            label: inp.label,
            type : inp.type,
            value : inp.value,
            conditions:conditonalarray,
            order: 1
        }));
      }
    }    
    return inputs;   //.sort((a, b) => a.order - b.order);
  }
}