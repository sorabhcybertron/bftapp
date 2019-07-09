import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormInputGeneratorBase } from './form-input-generator-base';

@Injectable()
export class FormInputGeneratorController {
  constructor() { }

  toFormGroup(inputs: FormInputGeneratorBase<any>[] ) {
    let group: any = {};

    inputs.forEach(input => {
      group[input.key] = input.required ? new FormControl(input.value || '', Validators.required)
                                              : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }
}
