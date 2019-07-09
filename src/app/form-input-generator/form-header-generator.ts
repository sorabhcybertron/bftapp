import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormHeaderGenerator extends FormInputGeneratorBase<string> {
  controlType = 'header';
  type: string;
  label:string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.label = options['label'] || '';
  }
}