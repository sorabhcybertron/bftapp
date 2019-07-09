import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormImageGenerator extends FormInputGeneratorBase<string> {
  controlType = 'Image';
  type: string;
  label:string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.label = options['label'] || '';
  }
}