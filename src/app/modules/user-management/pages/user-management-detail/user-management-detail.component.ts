import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-management-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.scss']
})
export class UserManagementDetailComponent implements OnInit, OnDestroy {
  user: User;
  subscriber: any;
  hidePassword = true;

  userForm: FormGroup;

  constructor(
    private _location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.user = {
      id: '',
      username: '',
      password: '',
      newPassword: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      accountNonLocked: true
    };
  }

  ngOnInit() {
    this.buildForm();

    this.subscriber = this.route.params.subscribe(params => {
      if (!params.id) { return; }
      this.userService.getById(params['id']).subscribe(rs => {
        this.user = {
          id: rs.id,
          username: rs.username,
          password: rs.password,
          newPassword: rs.newPassword,
          name: rs.name,
          email: rs.email,
          phone: rs.phone,
          department: rs.department,
          accountNonLocked: rs.accountNonLocked
        };

        this.buildForm();
      });
    });
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone],
      department: [this.user.department],
      accountNonLocked: [this.user.accountNonLocked]
    });
  }

  onSave() {
    const newUser = this.userForm.value;
    if (this.user.id) {
      this.userService.update(newUser).subscribe(rs => {
        this.user = rs;
      });
    } else {
      this.userService.create(newUser).subscribe(rs => {
        this.user = rs;
      });
    }
  }

  get loginFormControls() {
    return this.userForm.controls;
  }

  get form() {
      return this.userForm;
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}

export interface User {
  id: string;
  username: string;
  password: string;
  newPassword: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  accountNonLocked: boolean;
}
