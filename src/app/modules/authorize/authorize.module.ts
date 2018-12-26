import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthorizeRoutingModule } from './authorize-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './services/AuthService';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthorizeRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthorizeModule { }
