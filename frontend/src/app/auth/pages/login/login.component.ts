import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    us_login: ['', [Validators.required]],
    us_clave: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  login(){

    console.log(this.miFormulario.value);
    const {us_login, us_clave} = this.miFormulario.value;
    this.authService.login(us_login, us_clave)
    .subscribe(ok =>{

      if( ok == true ) {
        
        this.router.navigateByUrl('/dashboard');

      }else{
        Swal.fire('Error', ok, 'error');
      }
      
    });
  }

}
