import { Component, Input, OnInit } from '@angular/core';
import { Art } from '../../art.model';
import { ArtService } from '../../../art.service';


@Component({
  selector: 'app-art-item',
  templateUrl: './art-item.component.html',
  styleUrls: ['./art-item.component.css'],
  providers:[ArtService]
})
export class ArtItemComponent implements OnInit {
  @Input() art: Art;
  @Input() index: number;
  constructor(private artService: ArtService) { }

  ngOnInit(): void {
  }
  

}
