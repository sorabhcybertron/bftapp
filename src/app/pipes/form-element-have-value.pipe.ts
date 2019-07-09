import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup,FormControl,FormArray} from '@angular/forms';

@Pipe({
  name: 'formelementhavevalue'
})
export class FormElementHaveValue implements PipeTransform {
  transform(value: any, conditions:any): any {
  	console.log(value,conditions);
  	if(conditions){
  		// value[conditions[0]['onElement']];
  		console.log(conditions);
  		console.log(typeof(value),value);
  	}
    return false;
  }
}
