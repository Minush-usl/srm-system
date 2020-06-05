import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //login to system
        MaterialService.toast('Now you can login to the system')
      } else if (params['accessDenied']) {
        //authorization needed
        MaterialService.toast('Authorization is needed')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Please, relogin to the system')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.authService.login(this.form.value)
      .subscribe(
        () => {
          console.log('Login: Success'),
          this.router.navigate(['/overview'])
        },
        error => {
          MaterialService.toast(error.error.message)
          console.warn(error),
          this.form.enable()
        }
      )
  }

}
