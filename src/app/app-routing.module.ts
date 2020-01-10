import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtatComponent } from './etat/etat.component';
import { AddEtatComponent } from './add-etat/add-etat.component';
import { UpdateEtatComponent } from './update-etat/update-etat.component';
import { SalleComponent } from './salle/salle.component';
import { AddSalleComponent } from './add-salle/add-salle.component';
import { UpdateSalleComponent } from './update-salle/update-salle.component';
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
import { AuthGuardService, AuthGuardService2 } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:"etat",
    component: EtatComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"ajoutetat",
    component: AddEtatComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"modifieretat/:id",
    component: UpdateEtatComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"salle",
    component: SalleComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"ajoutsalle",
    component: AddSalleComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"modifiersalle/:id",
    component: UpdateSalleComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"service",
    component: ServiceComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"ajoutservice",
    component: AddServiceComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"modifierservice/:id",
    component: UpdateServiceComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"patient",
    component: PatientComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"ajoutpatient",
    component: AddPatientComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"modifierpatient/:id",
    component: UpdatePatientComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"medecin",
    component:MedecinComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"ajoutmedecin",
    component:AddMedecinComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"modifiermedecin/:id",
    component:UpdateMedecinComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"operation",
    component:OperationComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"ajoutoperation",
    component:AddOperationComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"modifieroperation/:id",
    component:UpdateOperationComponent,
    canActivate : [AuthGuardService]
  },
  {
    path:"",
    component:PageAccueilComponent,
  },
  {
    path:"ajoutuser",
    component:AddUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
