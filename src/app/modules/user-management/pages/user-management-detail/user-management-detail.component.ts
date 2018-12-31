import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'src/app/config/contants';
import { SnackBar } from 'src/app/shared/services/snackbar.service';
import { Location } from '@angular/common';
import { UserRoleService } from '../../shared/user-role.service';

@Component({
  selector: 'app-user-management-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.scss']
})
export class UserManagementDetailComponent implements OnInit, OnDestroy {
  user: User;
  subscriber: any;
  hidePassword = true;
  userRoles: any[];

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: SnackBar,
    private _location: Location,
    private userRoleService: UserRoleService
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
      accountNonLocked: true,
      role: ''
    };
  }

  ngOnInit() {
    this.buildForm();

    this.buildUserRoles();

    this.subscriber = this.route.params.subscribe(params => {
      if (!params.id) { return; }
      this.userService.getById(params['id']).subscribe(rs => {
        if (!rs) { return; }
        this.user = {
          id: rs.data.id,
          username: rs.data.username,
          password: rs.data.password,
          newPassword: rs.data.newPassword,
          name: rs.data.name,
          email: rs.data.email,
          phone: rs.data.phone,
          department: rs.data.department,
          accountNonLocked: rs.data.accountNonLocked,
          role: rs.data.role
        };

        this.buildForm();
      });
    });
  }

  buildUserRoles() {
    this.userRoleService.getAll().subscribe(res => {
      this.userRoles = res;
    });
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      newPassword: [this.user.newPassword],
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone],
      department: [this.user.department],
      accountNonLocked: [this.user.accountNonLocked],
      role: [this.user.role, Validators.required]
    });
  }

  onSave() {
    const newUser = this.userForm.value;
    if (this.user.id) {
      this.userService.update(newUser).subscribe(rs => {
        this.user = rs.data;
        this.snackBar.open(Message.UPDATE_SUCCESS);
      });
    } else {
      this.userService.create(newUser).subscribe(rs => {
        this.user = rs.data;
        this.buildForm();
        this.snackBar.open(Message.CREATE_SUCCESS);
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
  role: string;
}
