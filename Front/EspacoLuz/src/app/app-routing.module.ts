import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NovoComponent } from './pages/novo/novo.component';
import { PainelComponent } from './pages/painel/painel.component';
import { PilatesComponent } from './pages/pilates/pilates.component';
import { PlanosComponent } from './pages/planos/planos.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { MedidasComponent } from './pages/medidas/medidas.component';
import { UpdateComponent } from './pages/update/update.component';
import { FramePageComponent } from './pages/master/frame.page';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pilates', component: PilatesComponent },
      { path: 'planos', component: PlanosComponent },
      { path: 'fale-conosco', component: FaleConoscoComponent },
      { path: 'home', component: HomeComponent },
      { path: 'quem-somos', component: QuemSomosComponent },
      {
        path: 'update/:id',
        component: UpdateComponent,
        canActivate: [AuthService],
      },
    ],
  },

  {
    path: 'painel',
    component: FramePageComponent,
    children: [
      { path: '', component: PainelComponent, canActivate: [AuthService] },
      { path: 'novo', component: NovoComponent, canActivate: [AuthService] },
    ],
  },
  {
    path: 'aluno/:id',
    component: FramePageComponent,
    children: [
      { path: '', component: AlunoComponent, canActivate: [AuthService] },
      {
        path: 'medidas/:id',
        component: MedidasComponent,
        canActivate: [AuthService],
      },
      {
        path: 'atualizar/:id',
        component: UpdateComponent,
        canActivate: [AuthService],
      },
    ],
  },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'aluno', redirectTo: 'painel' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
