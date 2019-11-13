import { Injectable } from '@angular/core';
import { ServerCallsService } from '../server-calls.service';
import { FormInputGeneratorBase } from './form-input-generator-base';
import { FormInputTextboxGenerator, FormInputMFboxGenerator,
         FormCanvasGenerator, FormInputYNboxGenerator, FormParagraphGenerator, FormInputDateGenerator, FormImageGenerator, FormVideoGenerator
       } from './newInputGenerator';


@Injectable()
export class NewFormInputService {
    globalcanvasCount: number ;
    constructor(public servercall: ServerCallsService) {
      this.globalcanvasCount = 0;
    }

    getFormdata(resp, callType, fldNamePrefix?) {
      const namePrefix = (fldNamePrefix) ? fldNamePrefix : '';
      const inputs: FormInputGeneratorBase<any>[] = [];
      for (const inp of resp) {

        let conditonalarray: {onElement: '',  value: ''}[] = [];
      /*****************/
        if (inp['onClickFieldName'] !== undefined && inp['onClickFieldName'] !== null && inp['onClickFieldName'] !== '') {
            conditonalarray.push({
                onElement: inp['onClickFieldName'] || '',
                value: inp['onClickFieldValue'] || ''
            });
            // console.log(conditonalarray);
        } else {
          conditonalarray = null;
        }
      /*****************/

        if (inp['t'] === 'Text') {
            inputs.push(new FormInputTextboxGenerator({
                key: inp.q,
                label: inp.q,
                required: true,
                value: inp.value,
                type: inp.subtype,
                order: 1
            }));
        } else if (inp['t'] === 'Email') {
          inputs.push(new FormInputTextboxGenerator({
                key: inp.q,
                label: inp.q,
                required: true,
                value: inp.value,
                type: 'email',
                order: 1
            }));

        } else if (inp['t'] === 'Date') {
          inputs.push(new FormInputDateGenerator({
                key: inp.q,
                label: inp.q,
                required: true,
                value: inp.value,
                type: 'date',
                order: 1
            }));

        } else if (inp['t'] === 'Tel') {
          inputs.push(new FormInputTextboxGenerator({
                key: inp.q,
                label: inp.q,
                required: true,
                value: inp.value,
                type: 'tel',
                order: 1
            }));

        } else if (inp['t'] === 'M/F Toggle') {
          inputs.push(new FormInputMFboxGenerator({
              key: inp.q,
              label: inp.q,
              required: false,
              value: inp.value,
              type: inp.subtype,
              order: 1
          }));
        } else if (inp['t'] === 'Y/N Toggle') {
          inputs.push(new FormInputYNboxGenerator({
              key: inp.q,
              label: inp.q,
              required: inp.required ? true : false,
              value: inp.value,
              type: inp.subtype,
              order: 1
          }));
        } else if (inp['t'] === 'paragraph') {
          inputs.push(new FormParagraphGenerator({
            key: 'para',
            label: inp.q,
            required: true,
            value: inp.value,
            type: 'paragraph',
            order: 1
          }));
        } else if (inp['t'] === 'canvas') {
          let canvCout: any = null;
          if (callType === 'real') {
            this.globalcanvasCount++;
          }
          canvCout = this.globalcanvasCount;
          inputs.push(new FormCanvasGenerator({
              key: inp.q,
              label: inp.q,
              required: true,
              value: inp.value,
              type: 'canvas',
              canvasCount: canvCout,
              conditions: conditonalarray,
              order: 1
          }));
        } else if (inp['t'] === 'image') {
          inputs.push(new FormImageGenerator({
            key: 'imgs',
            label: inp.q,
            required: true,
            value: inp.value,
            type: 'image',
            order: 1
          }));
        } else if (inp['t'] === 'video') {
          inputs.push(new FormVideoGenerator({
            key: 'video',
            label: inp.q,
            required: true,
            value: inp.value,
            type: 'video',
            order: 1
          }));
        }
      }
      return inputs;
    }
  }
