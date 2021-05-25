import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Art } from "./art.model";
import { ArtService } from "../art.service";

@Injectable({
    providedIn: 'root'
})
export class ArtResolverService implements Resolve<Art[]>{
  constructor(private artService: ArtService){};
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const arts =  this.artService.getArt();
    if(arts.length ===0){
        return this.artService.fetchArts();
    }
    else{
        return arts;
    }
    
  }
}