import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Art } from '../art.model'
import { ArtService } from '../../art.service';
@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {
  arts: Art[] ;
  constructor(private artService: ArtService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.artService.artsUpdated.subscribe(
      (arts: Art[]) =>{
        this.arts = arts;
      }
    )
    this.arts = this.artService.getArt();
  }
 
  onNewArt(){
      this.router.navigate(['new'],{relativeTo: this.route})
  }
 
}
