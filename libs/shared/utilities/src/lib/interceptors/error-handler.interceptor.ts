import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError, Observable, switchMap } from "rxjs";
import { NotificationService } from "../../../../../../apps/client-app/src/app/shared/services/notification.service";
import { ErrorService } from "../error-handlers/error.server.handler";
import { AuthService } from "../../../../../../apps/client-app/src/app/shared/services/auth.service";
import { AuthDataModel } from "../../../../models/src/lib/api-response-models/auth/auth-data.model";
import { Result } from "../../../../models/src/lib/api-response-models/Result";
import { Router } from "@angular/router";
import { StorageService } from "../../../../../../apps/client-app/src/app/shared/services/storage.service";

// always call this last in your HTTP Interceptors
export function errorHandlerInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {

  // get dependencies
  const errorService = inject(ErrorService);
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const notify = inject(NotificationService);
  const router = inject(Router);

  return next(request).pipe(
    catchError(error => {
      // attempt to refresh token if existing one has expired.
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((res: Result<AuthDataModel>) => {
            if (res.success) {
              authService.maskUserAsAuthenticated(res.content as AuthDataModel, true);

              // reset authorization header
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${storageService.getAccessToken()}`
                }
              });

              return resendResult(request, next, errorService);
            } else {
              
              notify.errorMessage('Authentication Required', 'Unable to authenticate with the server! Please sign in again.');
              router.navigate(['auth/sign-in'], {
                state: { clearToken: true }
              });
              return throwError(error);
            }
          })
        );
      } else {
        if (!request.url.includes('refresh-token')) {
          return errorService.handleError()(error);
        }

        // at this stage, it failed while attempting to refresh token
        notify.errorMessage('Authentication Required', 'Unable to authenticate with the server! Please sign in again.');
        router.navigate(['auth/sign-in'], {
          state: { clearToken: true }
        });
        return throwError(error);
      }
    })
  );
}

// resend a request
function resendResult(request: HttpRequest<unknown>, next: HttpHandlerFn, errorService: ErrorService): Observable<any> {

  return next(request).pipe(
    catchError(errorService.handleError())
  );
}

