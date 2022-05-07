import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormAddFlavorService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }
}
