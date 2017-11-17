import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){

  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
   /* let path = route._urlSegment.segments[0].path;
    let roles;

    if (route.routeConfig.path == path) {
      roles = route.data.roles
    } else {
      roles = route.children.find(_route => _route.path == path).data.roles;
    }
    console.log(this.authService.getRole());
    if(this.authService.loggedIn() && roles.indexOf(this.authService.getRole()) != -1){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }*/
    return false;
  }
}
