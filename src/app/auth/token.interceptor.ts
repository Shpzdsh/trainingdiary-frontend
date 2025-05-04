import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = authService.getToken();
  if(!token) return next(req)
  return next(addToken(req, token));
};


const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
        Authorization: `Bearer ${token}`
    }
})
}
