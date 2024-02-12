import { NgClass, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginModel } from "../../../../shared/models/api-input-models/login.model";
import { AuthService } from "../../../../shared/services/auth.service";
import { Result } from "../../../../shared/models/api-response-models/Result";
import { AuthDataModel } from "../../../../shared/models/api-response-models/auth-data.model";
import { NotificationService } from "../../../../shared/services/notification.service";
import { SvpButtonModule } from "../../../../shared/components/buttons/btn.module";
import { SvpUtilityModule } from "../../../../shared/components/utilities/utility.module";
import { SvpFormInputModule } from "../../../../shared/components/input-fields/form-input.module";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        AngularSvgIconModule,
        NgClass,
        NgIf,
        SvpButtonModule,
        SvpUtilityModule,
        SvpFormInputModule
    ],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  userLogin!: LoginModel;

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private authService: AuthService,
    private notify: NotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userLogin = Object.assign({}, this.loginForm.value);

    this.authService.login(this.userLogin)
      .subscribe(async (res: Result<AuthDataModel>) => {
        console.log('--> Res', res);
        if (res.success) {
          this.notify.timedSuccessMessage(`Welcome back ${res.content?.user.firstName}`);

          this.authService.maskUserAsAuthenticated(res.content as AuthDataModel, this.userLogin.rememberMe);
          this.router.navigate(['dashboard']);
        } else {
          this.notify.errorMessage(res.title, res.message);
        }
      });
  }
}
