import {HttpClient, HttpParams} from '@angular/common/http';
import {  Subject } from "rxjs";
import { Art } from "../app/home/art.model";
import { Injectable } from '@angular/core';

import {exhaustMap, take, tap} from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArtService{
    artsUpdated = new Subject<Art[]>();
    private arts: Art[]=[]; 
    constructor(private http: HttpClient, private authService: AuthService){}
    getArt(){
      return this.arts.slice();
    }
    getArtbyId(id:number){
      return this.arts[id];
    }

    addArt(art: Art){
         console.warn(art);
         this.arts.push(art);
         this.artsUpdated.next(this.arts.slice());
         console.log("art added");
         console.log(this.arts.length)

    }

    updateArt(index: number, art: Art){
         this.arts[index] = art;
         this.artsUpdated.next(this.arts.slice());
    }

    deleteArt(index:number){
      this.arts.splice(index, 1);
      this.artsUpdated.next(this.arts.slice());    
    }

    setArts(arts: Art[]){
      this.arts = arts;
      this.artsUpdated.next(this.arts.slice());
    }

    storeArts(){
      const Arts = this.getArt();
      this.http
      .put<Art[]>('https://artbook-1ea05-default-rtdb.firebaseio.com/arts.json',Arts)
      .subscribe(response => {console.log(response);})
    }

    fetchArts(){
      
        return this.http
           .get<Art[]>('https://artbook-1ea05-default-rtdb.firebaseio.com/arts.json')
           .pipe(
               tap(arts => {this.setArts(arts);})
           )
         //tap operator allows us to execute some code in place without altering the data
    }

    

}