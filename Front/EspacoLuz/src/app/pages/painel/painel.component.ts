import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno, ResponseAluno } from 'src/app/models/Aluno';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss'],
})
export class PainelComponent implements OnInit {
  id: any;
  alunos: ResponseAluno;
  alunosFiltrados: ResponseAluno['value'] = [];
  _filtroList: string = '';

  public get filtroList(): string {
    return this._filtroList;
  }

  public set filtroList(value: string) {
    this._filtroList = value;
    this.alunosFiltrados = this.filtroList
      ? this.filtrarAlunos(this.filtroList)
      : this.alunos.value;
  }

  filtrarAlunos(filtrarPor: string): ResponseAluno['value'] {
    return this.alunos.value.filter(
      (aluno: any) => aluno.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private data: DataService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAlunos();
    this.recuperarId();
  }
  recuperarId() {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
  }
  deletarAluno(id: number) {
    const idConvert = id.toString();
    const pergunta = confirm('deseja realmente deletar o Aluno?');
    if (pergunta == true) {
      this.data.deleteAluno(idConvert).subscribe((res) => {});
      window.location.reload();
    } else {
      alert('Aluno Mantido');
    }
  }

  detalheAluno(id: number): void {
    this.router.navigate([`aluno/${id}`]);
  }

  // public getAlunos(): void {
  //   this.data.getAlunos().subscribe(
  //     (res) => ((this.alunos = res), console.log(res)),
  //     (err: any) => console.log(err)
  //   );
  // }

  public getAlunos(): void {
    this.data.getAlunos().subscribe(
      (res: ResponseAluno) => {
        this.alunos = res;
        this.alunosFiltrados = this.alunos.value;
      },

      (err: any) => console.log(err)
    );
  }
}
