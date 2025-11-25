import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) {}


  onSubmit() {
  this.auth.register(this.user).subscribe({
    next: (res) => {
      console.log("Usuario creado", res);
      alert("Registro exitoso!");
    },
    error: (err) => {
      alert(err.error.msg);
    }
  });
}

}
