import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputNumberGenerator extends FormInputGeneratorBase<string> {
  controlType = 'numberInput';
  max : number;min:number;step:number; 
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.max = options['max'] || null;
    this.min = options['min'] || null;
    this.step = options['step'] || null;
  }
}