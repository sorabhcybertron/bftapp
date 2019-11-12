import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { ReplaceStringPipe } from './pipes/replace-string.pipe';
import { SafeHtml } from './pipes/safe-html.pipe';
import { FormElementHaveValue } from './pipes/form-element-have-value.pipe';

import {HttpClientModule} from '@angular/common/http';

import { ServerCallsService } from './server-calls.service';

import { FormBuilder,FormGroup, FormsModule,ReactiveFormsModule,FormArray}from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewVisitorwalkComponent } from './new-visitorwalk/new-visitorwalk.component';
import { PlansComponent } from './plans/plans.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { AftersubmitComponent } from './aftersubmit/aftersubmit.component';
import { IntrestformComponent } from './intrestform/intrestform.component';
import { VisitorwalkComponent } from './visitorwalk/visitorwalk.component';




const routes: Routes = [
  { path: '', component: GetStartedComponent,canActivate: [ServerCallsService]   },
  { path: 'dashboard', component: DashboardComponent,	canActivate: [ServerCallsService]   },
  { path: 'new-visitor', component: VisitorwalkComponent,  canActivate: [ServerCallsService]   },
  { path: 'new-visitor/:formid', component: VisitorwalkComponent,  canActivate: [ServerCallsService]   },
  { path: 'thankyou/:formid', component: AftersubmitComponent,  canActivate: [ServerCallsService]   },
  { path: 'intrests/:formid', component: IntrestformComponent,  canActivate: [ServerCallsService]   },
  { path: 'plans', component: PlansComponent,  canActivate: [ServerCallsService]   },
  { path: 'login', component: LoginComponent,	canActivate: [ServerCallsService]   },
  { path: '**', redirectTo: '' }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GetStartedComponent,
    DashboardComponent,
    NewVisitorwalkComponent,
    PlansComponent,
    ReplaceStringPipe,
    FormElementHaveValue,
    SafeHtml,
    AftersubmitComponent,
    IntrestformComponent,
    VisitorwalkComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SignaturePadModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot()
  ],
  providers: [ServerCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
