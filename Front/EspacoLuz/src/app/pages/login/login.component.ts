import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = FormGroup;

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    const token = Security.getToken();
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
  }

  submit() {
    this.data.authenticate(this.form.value).subscribe(
      (dado: any) => {
        this.setUser(this.form.value.email, dado.value.token);
        if (dado.value.token) {
          this.router.navigate(['/painel']);
        } else {
          Security.clear();
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  token(): boolean {
    if (Security.hasToken()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    Security.clear();
    this.router.navigate(['/']);
  }
}
