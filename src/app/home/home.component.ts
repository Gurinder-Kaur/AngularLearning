import { Component, OnInit } from '@angular/core';
import { Art } from './art.model';
import { ArtService } from '../art.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
