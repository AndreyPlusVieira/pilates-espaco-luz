import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent implements OnInit {
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('Senha', 'ConfirmeSenha'),
    };

    this.form = this.fb.group(
      {
        Email: ['', [Validators.required, Validators.email]],
        Senha: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmeSenha: ['', Validators.required],
      },
      formOptions
    );
  }
}
