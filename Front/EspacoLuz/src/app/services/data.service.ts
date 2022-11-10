import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import {
  Aluno,
  RequestAluno,
  ResponseAluno,
  ResponseById,
  ResponseCreate,
  ResponseDelete,
  ResponseUpdate,
} from '../models/Aluno';
import {
  medidaPostRequest,
  responseMedida,
  ResponseMedidas,
} from '../models/Medida';
import { Token } from '@angular/compiler';
import { Security } from '../utils/security.util';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://localhost:7289/alunos';
  private urlBase = 'https://localhost:7289';
  private rota = 'medidas';

  constructor(private http: HttpClient) {}

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  authenticate(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/token-post`, data);
  }

  // --------- ALUNOS ----------

  getAlunos(): Observable<ResponseAluno> {
    return this.http.get<ResponseAluno>(this.url, {
      headers: this.composeHeaders(),
    });
  }

  getAlunosById(id: any): Observable<ResponseById> {
    const _url = `${this.url}/${id}`;
    return this.http.get<ResponseById>(_url, {
      headers: this.composeHeaders(),
    });
  }

  createAluno(request: RequestAluno): Observable<ResponseCreate> {
    return this.http.post<ResponseCreate>(this.url, request, {
      headers: this.composeHeaders(),
    });
  }

  updateAluno(id: any, request: RequestAluno): Observable<ResponseUpdate> {
    const _url = `${this.url}/${id}`;

    return this.http.put<ResponseUpdate>(_url, request, {
      headers: this.composeHeaders(),
    });
  }

  deleteAluno(id: any): Observable<any> {
    const _url = `${this.url}/${id}`;

    return this.http.delete<any>(_url, {
      headers: this.composeHeaders(),
    });
  }

  // ------------------- MEDIDAS ----------------------
  getMedidasById(id: any): Observable<responseMedida> {
    const m_url = `${this.url}/${id}/${this.rota}`;
    return this.http.get<responseMedida>(m_url, {
      headers: this.composeHeaders(),
    });
  }

  deleteMedida(id: any): Observable<any> {
    const m_url = `${this.url}/medidas/${id}`;
    return this.http.delete<any>(m_url, {
      headers: this.composeHeaders(),
    });
  }

  createMedida(
    id: any,
    request: medidaPostRequest
  ): Observable<responseMedida> {
    const m_url = `${this.url}/${id}/medidas`;

    return this.http.post<responseMedida>(m_url, request, {
      headers: this.composeHeaders(),
    });
  }

  // -------------- imagem aluno -------------------

  postUpload(eventoId: number, file: File): Observable<Aluno> {
    const i_url = `${this.urlBase}/upload-image/${eventoId}`;
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post<Aluno>(i_url, formData, {
      headers: this.composeHeaders(),
    });
  }
}
