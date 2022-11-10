import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PilatesComponent } from './pages/pilates/pilates.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { PlanosComponent } from './pages/planos/planos.component';
import { LoginComponent } from './pages/login/login.component';
import { PainelComponent } from './pages/painel/painel.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { NovoComponent } from './pages/novo/novo.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MedidasComponent } from './pages/medidas/medidas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { UpdateComponent } from './pages/update/update.component';
import { FramePageComponent } from './pages/master/frame.page';
import { AuthService } from './services/auth.service';
import { GoogleMapsModule } from '@angular/google-maps';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PilatesComponent,
    QuemSomosComponent,
    FaleConoscoComponent,
    PlanosComponent,
    LoginComponent,
    PainelComponent,
    AlunoComponent,
    NovoComponent,
    CadastrarComponent,
    HeaderComponent,
    FooterComponent,
    MedidasComponent,
    UpdateComponent,
    FramePageComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
