import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { RequestAluno } from 'src/app/models/Aluno';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
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
    private router: ActivatedRoute
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.Validation();
    this.recuperarId();
  }

  recuperarId() {
    this.id = this.router.snapshot.paramMap.get('id');

    console.log(this.id);
    this.data.getAlunosById(this.id).subscribe((res) => {
      this.request = {
        nome: res.value.nome,
        telefone: res.value.telefone,
        email: res.value.email,
        endereco: res.value.endereco,
        profissao: res.value.profissao,
        nascimento: res.value.nascimento,
        imagem: res.value.imagem,
      };
    });
  }

  atualizar() {
    this.data.updateAluno(this.id, this.request).subscribe((res) => {
      alert('Atualizado');
    });
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
