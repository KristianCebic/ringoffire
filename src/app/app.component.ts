import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { subscribe } from 'diagnostics_channel';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Stelle sicher, dass du das CommonModule importierst
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ CommonModule, RouterModule ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);

  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}