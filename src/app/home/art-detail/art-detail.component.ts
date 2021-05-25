import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Art } from '../art.model';
import { ArtService } from '../../art.service';

@Component({
  selector: 'app-art-detail',
  templateUrl: './art-detail.component.html',
  styleUrls: ['./art-detail.component.css']
})
export class ArtDetailComponent implements OnInit {
  art: Art;
  id: number;
  constructor(private artService: ArtService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.art = this.artService.getArtbyId(this.id);
      }
    );
  }
 
  onEditArt(){
       this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteArt(){
      this.artService.deleteArt(this.id);
      this.router.navigate(['../'],{relativeTo:this.route})
  }
}
