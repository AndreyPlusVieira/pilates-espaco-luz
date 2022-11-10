import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Aluno, RequestAluno } from 'src/app/models/Aluno';
import { Medida, responseMedida } from 'src/app/models/Medida';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
})
export class AlunoComponent implements OnInit {
  id: any;
  request: Aluno | undefined;
  responseMedidas: responseMedida;
  imagemURl = 'assets/uploadclould.png';
  file: File;

  constructor(private router: ActivatedRoute, private data: DataService) {}

  ngOnInit(): void {
    this.encontrarId();
    this.encontrarAlunoPorId();
    this.encontarMedidasPorId();
  }

  encontrarId() {
    this.id = this.router.snapshot.paramMap.get('id');
  }

  encontrarAlunoPorId() {
    this.data.getAlunosById(this.id).subscribe((res) => {
      this.request = {
        id: res.value.id,
        nome: res.value.nome,
        telefone: res.value.telefone,
        email: res.value.email,
        endereco: res.value.endereco,
        profissao: res.value.profissao,
        nascimento: res.value.nascimento,
        imagem: res.value.imagem,
      };

      if (this.request.imagem !== '') {
        this.imagemURl =
          environment.apiURl + '/resources/images/' + res.value.imagem;
      }
    });
  }

  encontarMedidasPorId() {
    this.data.getMedidasById(this.id).subscribe(
      (res) => (this.responseMedidas = res),
      (err: any) => console.log(err)
    );
  }

  deletarMedida(id: number) {
    const idConvert = id.toString();
    const pergunta = confirm('deseja realmente deletar a medida?');

    if (pergunta == true) {
      this.data.deleteMedida(idConvert).subscribe((res) => {});
      window.location.reload();
    } else {
      alert('Medida Mantida');
    }
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const reader = new FileReader();

    reader.onload = (evento: any) => (this.imagemURl = evento.target.result);

    this.file = files.item(0) as File;
    reader.readAsDataURL(this.file);

    this.uploadImage();
  }

  uploadImage(): void {
    this.data.postUpload(this.id, this.file).subscribe(
      () => {},
      () => {}
    );
  }

  // handleFileInput(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const files = target.files as FileList;
  //   console.log(files);

  //   this.fileToUpload = files.item(0) as File;

  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imagemURl = event.target.result;
  //   };
  //   reader.readAsDataURL(this.fileToUpload);
  // }
}
