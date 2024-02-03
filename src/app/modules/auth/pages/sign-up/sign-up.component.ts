import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvpPrimaryButtonComponent } from '../../../../shared/components/buttons/btn-primary.component';
import { SvpInputComponent } from '../../../../shared/components/input-fields/svp-input.component';
import { SvpAnchorComponent } from '../../../../shared/components/utilities/svp-anchor.component';
import { SvpValidationErrorsComponent } from '../../../../shared/components/input-fields/svp-validation-errors.component';
import { NgClass } from '@angular/common';
import { passwordMatchValidator } from '../../../../shared/validators/PasswordMatchValidator';
import { AuthService } from '../../../../shared/services/auth.service';
import { Result } from '../../../../shared/models/utils/Result';
import { NotificationService } from '../../../../shared/services/notification.service';

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
        SvpPrimaryButtonComponent,
        SvpInputComponent,
        SvpAnchorComponent,
        SvpValidationErrorsComponent,
        ReactiveFormsModule
    ],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  passwordStrength: number = 0;
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
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

  signUp() {
    console.log(this.registerForm.value);

    this.notify.showLoader();

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let param = Object.assign({}, this.registerForm.value);

    this.authService.signUpClient(param)
      .subscribe(async (res: Result) => {
        if (res.success) {
          this.router.navigate(['dashboard']);
        } else {

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