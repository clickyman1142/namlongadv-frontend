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
    submitted: boolean;

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
        this.submitted = true;
        const credentials = this.loginForm.value;
        this.authService.login(credentials.username, credentials.password).subscribe(
            res => {
                console.log('redirect to home');
                this.router.navigate([AppConfig.routes.home]);
            },
            err => {
                // TODO: handle error
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
