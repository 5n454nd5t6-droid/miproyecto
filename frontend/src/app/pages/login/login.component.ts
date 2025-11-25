import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login = {
    email: '',
    password: ''
  };

 constructor(private auth: AuthService) {}


 onSubmit() {
  this.auth.login(this.login).subscribe({
    next: (res) => {
      console.log("Login correcto", res);
      alert("Bienvenido!");
    },
    error: (err) => {
      alert(err.error.msg);
    }
  });
}

}
