export interface Aluno {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  profissao: string;
  nascimento: string;
  imagem: string;
}

export interface ResponseAluno {
  value: Aluno[];
  statusCode: number;
  contentType?: any;
}

export interface RequestAluno {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  profissao: string;
  nascimento: string;
  imagem: string;
}

export interface ResponseCreate {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  profissao: string;
  nascimento: string;
  imagem: string;
  medidas?: any;
  criadoPor: string;
  criadoEm: Date;
  editadoPor: string;
  editadoEm: Date;
  notifications: any[];
  isValid: boolean;
}

// modelos para o getId

export interface ResponseById {
  value: Aluno;
}

export interface ResponseUpdate {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  profissao: string;
  nascimento: string;
  imagem: string;
  medidas?: any;
  criadoPor: string;
  criadoEm: Date;
  editadoPor: string;
  editadoEm: Date;
  notifications: any[];
  isValid: boolean;
}

//response delete

export interface ResponseDelete {
  value: string;
  statusCode: number;
  contentType?: any;
}
