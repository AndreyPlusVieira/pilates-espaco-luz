import { Aluno } from './Aluno';

export interface Medida {
  id: number;
  data: string;
  altura: string;
  peso: string;
  cintura: string;
  busto: string;
  biceps: string;
  coxa: string;
  panturrilha: string;
}

export interface medidaPostRequest {
  alunoId: number;
  altura: number;
  peso: number;
  cintura: number;
  busto: number;
  biceps: number;
  coxa: number;
  panturrilha: number;
}

export interface medidaPutRequest {
  altura: number;
  peso: number;
  cintura: number;
  busto: number;
  biceps: number;
  coxa: number;
  panturrilha: number;
}

export interface responseMedida {
  value: Medida[];
  statusCode: number;
  contentType?: any;
}

export interface ResponseMedidas {
  id: number;
  altura: number;
  peso: number;
  cintura: number;
  busto: number;
  biceps: number;
  coxa: number;
  panturrilha: number;
  alunoId: number;
  aluno?: any;
  criadoPor: string;
  criadoEm: Date;
  editadoPor: string;
  editadoEm: Date;
  notifications: any[];
  isValid: boolean;
}
