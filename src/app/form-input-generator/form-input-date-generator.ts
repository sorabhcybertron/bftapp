import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputDateGenerator extends FormInputGeneratorBase<string> {
  controlType = 'dateinput';
  type: string;
  label:string;
  
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.label = options['label'] || '';
  }
}