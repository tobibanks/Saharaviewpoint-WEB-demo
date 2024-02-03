import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientRegisterModel } from "../models/input-models/client-register";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUpClient(param: ClientRegisterModel): Observable<any> {
    return this.http.post<any>(`auth/sign-up`, param);
  }

  getUser(userRef: string): Observable<any> {
    return this.http.get<any>(`api/users/${userRef}`);
  }
}