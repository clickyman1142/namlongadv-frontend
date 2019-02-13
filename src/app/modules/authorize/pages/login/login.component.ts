import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ]
})
export class LoginComponent implements OnInit {
    hidePassword = true;
    loginForm: FormGroup;
    credentials: Credentials;
    submitting: boolean;
    submitted: boolean;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.credentials = {
            username: '',
            password: ''
        };
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [this.credentials.username, Validators.required],
            password: [this.credentials.password, Validators.required]
        });
    }

    onLogin() {
        this.submitting = true;
        const credentials = this.loginForm.value;
        this.authService.login(credentials.username, credentials.password).subscribe(
            res => {
                this.submitted = true;
                this.submitting = false;
                this.router.navigate([AppConfig.routes.home]);
            },
            err => {
                this.submitted = true;
                this.submitting = false;
                this.errorMessage = 'Tên đăng nhập hoặc Mật khẩu không đúng';
            }
        );
    }

    get loginFormControls() {
        return this.loginForm.controls;
    }

    get form() {
        return this.loginForm;
    }
}

export interface Credentials {
    username: string;
    password: string;
}
