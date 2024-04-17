import { Component, inject } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ CommonModule, RouterModule ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor() {
  }
}