import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SignUpInterface } from '../../inteface/singup.interface';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  email!: string;
  password!: string;

  private readonly api = inject(ApiService);
  private toastrService = inject(ToastrService);

  ngOnInit(): void {}

  onSignUp(): void {
    const signUp: SignUpInterface = {
      email: this.email,
      password: this.password,
    };
    this.api.signUp(signUp).subscribe({
      next: (data) => {
        console.log(data);
        this.toastrService.success(data.message);
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error(error.error.message);
      },
    });
  }
}
