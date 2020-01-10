import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EtatComponent } from './etat/etat.component';
import { AddEtatComponent } from './add-etat/add-etat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEtatComponent } from './update-etat/update-etat.component';
import { SalleComponent } from './salle/salle.component';
import { UpdateSalleComponent } from './update-salle/update-salle.component';
import { AddSalleComponent } from './add-salle/add-salle.component';
import { ServiceComponent } from './service/service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { MedecinComponent } from './medecin/medecin.component';
import { AddMedecinComponent } from './add-medecin/add-medecin.component';
import { UpdateMedecinComponent } from './update-medecin/update-medecin.component';
import { OperationComponent } from './operation/operation.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { AddUserComponent } from './add-user/add-user.component';
import { JwtModule } from '@auth0/angular-jwt'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EtatComponent,
    AddEtatComponent,
    UpdateEtatComponent,
    SalleComponent,
    UpdateSalleComponent,
    AddSalleComponent,
    ServiceComponent,
    AddServiceComponent,
    UpdateServiceComponent,
    PatientComponent,
    AddPatientComponent,
    UpdatePatientComponent,
    MedecinComponent,
    AddMedecinComponent,
    UpdateMedecinComponent,
    OperationComponent,
    AddOperationComponent,
    UpdateOperationComponent,
    PageAccueilComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    JwtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
