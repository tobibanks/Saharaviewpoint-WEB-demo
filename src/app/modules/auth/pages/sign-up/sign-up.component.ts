import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { passwordMatchValidator } from '../../../../shared/validators/PasswordMatchValidator';
import { AuthService } from '../../../../shared/services/auth.service';
import { Result } from '../../../../shared/models/api-response-models/Result';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ClientRegisterModel } from '../../../../shared/models/api-input-models/client.register.model';
import { AuthDataModel } from '../../../../shared/models/api-response-models/auth/auth-data.model';
import { SvpUtilityModule } from '../../../../shared/components/utilities/utility.module';
import { SvpButtonModule } from '../../../../shared/components/buttons/btn.module';
import { SvpFormInputModule } from '../../../../shared/components/input-fields/form-input.module';
import { SvpAuthInputComponent } from '../../components/auth-input.component';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        NgClass,
        AngularSvgIconModule,
        ReactiveFormsModule,
        SvpUtilityModule,
        SvpButtonModule,
        SvpFormInputModule,
        SvpAuthInputComponent
    ],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  passwordStrength: number = 0;
  
  returnUrl!: string;

  registerClient!: ClientRegisterModel;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  ngOnInit(): void {    
    this.initForm();

    if (history.state.clearToken) {
      this.authService.maskUserAsLoggedOut();
    }

    // redirect to dashboard if user is still logged in
    if (this.authService.IsAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.compose([Validators.required])],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  async signUp() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerClient = Object.assign({}, this.registerForm.value);

    this.authService.signUpClient(this.registerClient)
      .subscribe(async (res: Result<AuthDataModel>) => {
        console.log('--> Res', res);
        if (res.success) {
          this.notify.timedSuccessMessage('Sign up successful.');

          this.authService.maskUserAsAuthenticated(res.content as AuthDataModel, true);
          this.router.navigate(['dashboard']);
        } else {
          this.notify.errorMessage(res.title, res.message);
        }
      });
  }

  calculatePasswordStrength(password: string): void {
    this.passwordStrength = 0;

    // Fluent validations logic
    if (password.length >= 8) {
      this.passwordStrength += 15; // At least 8 characters
    }

    if (password.length >= 8 && password.length <= 20) {
      this.passwordStrength += 10; // Not exceeding 20 characters
    }

    if (/[A-Z]/.test(password)) {
      this.passwordStrength += 15; // Contains at least one uppercase letter
    }

    if (/[a-z]/.test(password)) {
      this.passwordStrength += 10; // Contains at least one lowercase letter
    }

    if (/[0-9]/.test(password)) {
      this.passwordStrength += 25; // Contains at least one number
    }

    if (/[\!\?\*\.\#\$\(\)]/.test(password)) {
      this.passwordStrength += 25; // Contains at least one special character (!?#$*.)
    }
  }
}