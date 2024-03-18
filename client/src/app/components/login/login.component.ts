import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  tabIndex = 0;
  remember_session = false;
  public userLogIn: User;
  public userSignUp: User;
  public roles = [
    { id: 1, value: 'Administrador' },
    { id: 2, value: 'Usuario Normal' },
  ];

  constructor(private router: Router, private loginService: LoginService) {
    this.userLogIn = new User();
    this.userSignUp = new User();
  }

  // Role 1 = admin; Role 2 = normal user
  login(role: number) {
    switch (role) {
      case 1:
        this.router.navigate(['/conference-crud']);
        break;
    
      default:
        this.router.navigate(['/conference']);
        break;
    }
  }

  validateLogin() {
    if (this.userLogIn.username && this.userLogIn.password) {
      this.loginService.validateLogin(this.userLogIn).subscribe(
        (result) => {
          if (result) {
            this.login(this.userLogIn.role);
          } else {
            alert('Contraseña equivocada');
          }
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Ingresar un usuario y contraseña');
    }
  }

  signUp() {
    console.log(this.userSignUp);
    if (
      this.userSignUp.username &&
      this.userSignUp.password &&
      this.userSignUp.role
    ) {
      this.loginService.validateSignUp(this.userSignUp).subscribe(
        (userAlreadyExists) => {
          if (userAlreadyExists) {
            alert('El usuario ya existe');
          } else {
            this.loginService.signUp(this.userSignUp).subscribe(
              (result) => {
                this.login(this.userSignUp.role);
                console.log(result);
              },
              (error) => {
                console.log(error);
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Ingresar un usuario, contraseña y un rol');
    }
  }

  keepSession() {
    // TODO
    console.log('RECORDAR SESION:', this.remember_session);
  }

  changeTab() {
    this.tabIndex = (this.tabIndex + 1) % 2;
  }
}
