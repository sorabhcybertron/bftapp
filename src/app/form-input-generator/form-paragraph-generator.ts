import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormParagraphGenerator extends FormInputGeneratorBase<string> {
  controlType = 'paragraph';
  type: string;
  label:string;
  canvascount:number;
  conditions:{onElement:'', value:''}[] = []

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.label = options['label'] || '';
    if(options['type'] == 'canvas')
	    this.canvascount = (options['canvasCount'])? (options['canvasCount']) : null;
    this.conditions = (options['conditions']) ? options['conditions'] :null;
  }
}