import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

    constructor(private formBuilder: FormBuilder) {
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
        console.log(this.loginForm.value);
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
