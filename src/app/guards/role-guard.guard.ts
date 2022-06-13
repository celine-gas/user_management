import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }
  
  //renvoie true si le role en cours (expectedrole) est dans la liste des role
  isAuthorized(route: ActivatedRouteSnapshot): boolean{
    const roles = ['Admin']; //role de l'utilisateur courant local Storage
    const expectedRoles = route.data['expectedRoles'];
    const rolesMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1);
    return (rolesMatches < 0 )? false : true;
  }
}
