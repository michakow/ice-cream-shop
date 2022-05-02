import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormLoginService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    const form = this.formBuilder.group({
      login: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }
}
