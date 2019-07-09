import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceString'
})
export class ReplaceStringPipe implements PipeTransform {

  transform(value: string, trg: string,rplc:string): any {
  	// console.log(value,trg,rplc);
    let val = value;
    if(val.indexOf(trg) == 1){
    	val = val.replace(trg,rplc);
    }
    return val;
  }

}
