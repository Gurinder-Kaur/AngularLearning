import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtService } from '../art.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private artService: ArtService, private authService: AuthService) {}
  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !user ? false: true;
    });
  }
  onSaveData(){
      this.artService.storeArts();
  }
  onFetchData(){
    console.log("fetch called")
    this.artService.fetchArts().subscribe();
  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(){
    this.userSub.unsubscribe
  }
    
}
