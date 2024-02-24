import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ClientRegisterModel } from "../models/api-input-models/client.register.model";
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { StorageService } from "./storage.service";
import { Result } from "../models/api-response-models/Result";
import { AuthDataModel } from "../models/api-response-models/auth/auth-data.model";
import { LoginModel } from "../models/api-input-models/login.model";
import { AuthRoleData } from "../models/utils/AuthRoleData";
import { RoleEnum } from "../enums/RoleEnum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject(false);  
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private notify: NotificationService
  ) {
    this.checkUserData();
  }

  getUser() {
    return this.storageService.getUser();
  }
  
  checkUserData() {
    let user = this.getUser();
    if (user === undefined || user === null) {
      this.authState.next(false);
    } else {
      this.authState.next(true);
    }
  }

  IsAuthenticated() {
    return this.authState.value;
  }

  OnAuthStatusChange() {
    return this.authState.asObservable(); 
  }

  async logUserOut() {
    let user = this.getUser();
    if (user === undefined || user === null) {
      this.maskUserAsLoggedOut();
      this.router.navigate(['/auth/sign-in']);
      return;
    }
    await this.notify.showLoader();
    this.logout(user.uid).subscribe(async (res: Result<any>) => {
      if (res.success) {
        await this.notify.hideLoader();
        this.maskUserAsLoggedOut();
        this.router.navigate(['/auth/sign-in']);
      } else {
        this.notify.errorMessage(res.title, res.message);
      }
    });
  }

  signUpClient(param: ClientRegisterModel): Observable<Result<AuthDataModel>> {
    return this.http.post<Result<AuthDataModel>>(`auth/sign-up`, param);
  }

  login(param: LoginModel): Observable<Result<AuthDataModel>> {
    return this.http.post<Result<AuthDataModel>>('auth/token', param);
  }

  refreshToken() {    
    let param = {
      refreshToken: this.storageService.getRefreshToken()
    };
    
    return this.http.post<Result<AuthDataModel>>(`auth/refresh-token`, param);
  }

  logout(userReference: string): Observable<Result<any>> {
    return this.http.post<Result<any>>(`auth/${userReference}/logout`, null);
  }

  maskUserAsAuthenticated(authData: AuthDataModel, rememberMe: boolean) {
    this.storageService.storeToken(authData.token, rememberMe);
    this.storageService.storeUser(authData.user, rememberMe);
    this.storageService.storeRefreshToken(authData.refreshToken, rememberMe);

    this.authState.next(true);
  }

  maskUserAsLoggedOut() {
    this.storageService.clearAuthData();
    this.storageService.clearUserData();
    
    this.authState.next(false);
  }

  userIsInRole(roles: string[]): boolean {
    let userRoles = this.storageService.getUserRoles() as AuthRoleData;

    // Check if any of the roles in the provided array is present in userRoles
    return roles.some(role => userRoles[role]);
  }
}