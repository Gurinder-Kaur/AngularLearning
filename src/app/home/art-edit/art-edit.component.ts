import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ArtService } from '../../art.service';
import { Art } from '../art.model';

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css']
})
export class ArtEditComponent implements OnInit {
  id: number;
  editMode = false;
  artForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private   artService : ArtService,
              private router: Router
    ) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  onSubmit(){
    const newArt = new Art(
      this.artForm.value['title'], 
      this.artForm.value['creator'], 
      this.artForm.value['description'],
      this.artForm.value['imagepath']
      );

    if(this.editMode){
      this.artService.updateArt(this.id,newArt)
    }
    else{
      this.artService.addArt(newArt)
    }
    this.onCancel();
    this.artService.storeArts();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  private initForm(){
    let artTitle = '';
    let artCreator ='';
    let artImagepath = '';
    let artDescription = '';


    if(this.editMode){
      const art = this.artService.getArtbyId(this.id);
      artTitle = art.title;
      artCreator = art.creator;
      artImagepath = art.imagePath;
      artDescription = art.description;
    }
      this.artForm = new FormGroup({
        'title': new FormControl(artTitle, Validators.required),
        'creator': new FormControl(artCreator, Validators.required),
        'imagepath': new FormControl(artImagepath, Validators.required),
        'description': new FormControl(artDescription, Validators.required),
      });

  }
  
}
