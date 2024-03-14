import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})

export class EditPlayerComponent {
  allProfilePictures = [
    'boy.png', 
    'female.png', 
    'pinguine.svg', 
    'monkey.png',
    'winkboy.svg',
    'female-avatar.jpg',
  ]

  constructor (
    public dialogRef: MatDialogRef<EditPlayerComponent>
    ) {}
}
