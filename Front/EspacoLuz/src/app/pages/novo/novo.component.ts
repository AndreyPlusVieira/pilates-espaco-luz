import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Aluno, RequestAluno } from 'src/app/models/Aluno';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss'],
})
export class NovoComponent implements OnInit {
  id: any;
  request: RequestAluno = {
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    profissao: '',
    nascimento: '',
    imagem: '',
  };
  form: FormGroup;

  locale = 'pt-br';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-orange',
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private data: DataService,
    private route: Router
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.Validation();
  }

  save() {
    this.data.createAluno(this.request).subscribe((res) => {});
    alert(`Criado com Sucesso`);
    this.route.navigate(['/painel']);
  }

  public Validation(): void {
    this.form = this.fb.group({
      Nome: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      Telefone: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      Endereco: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255),
        ],
      ],
      Profissao: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      Nascimento: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
    });
  }
}
