import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, catchError } from "rxjs";
import { NotificationService } from "../services/notification.service";
import { ErrorService } from "../utilities/error.server.handler";

// always call this last in your HTTP Interceptors
export function errorHandlerInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {

  // get dependencies
  const errorService = inject(ErrorService);
  
  return next(request).pipe(
    catchError(errorService.handleError())
  );
}