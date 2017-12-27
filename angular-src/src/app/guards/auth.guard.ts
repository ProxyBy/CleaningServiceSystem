import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    let roles;
    roles = route.data.roles;
    if(this.authService.loggedIn() && roles.indexOf(this.authService.getRole()) != -1){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
