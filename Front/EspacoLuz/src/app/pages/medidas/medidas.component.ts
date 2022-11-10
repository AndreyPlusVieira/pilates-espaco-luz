import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';
import { medidaPostRequest } from 'src/app/models/Medida';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.scss'],
})
export class MedidasComponent implements OnInit {
  id: any;

  request: medidaPostRequest = {
    altura: 0,
    peso: 0,
    cintura: 0,
    busto: 0,
    biceps: 0,
    coxa: 0,
    panturrilha: 0,
    alunoId: 0,
  };

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private data: DataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.recuperarId();
  }

  save() {
    console.log(this.request);
    this.data.createMedida(this.id, this.request).subscribe((res) => {
      console.log(res);
    });
    alert(`Criado com Sucesso`);
    this.route.navigate([`aluno/${this.id}`]);
  }

  voltar() {
    this.route.navigate([`aluno/${this.id}`]);
  }

  recuperarId() {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
