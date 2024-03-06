import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})



export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { 
    this.game = new Game(); 
  }

  ngOnInit(): void {
    this.newGame();
    this
    .firestore
    .collection('items')
    .valueChanges()
    .subscribe((game) => {
      console.log('Game update', game);
    });
  }

  newGame(){
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;
        console.log('New card: ' + this.currentCard);
        console.log('Game is', this.game);

        this.game.currentPlayer++
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
      setTimeout(()=>{
        if (this.currentCard) {
          this.game.playedCard.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1000);
  }
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.length > 0)
    this.game.players.push(name)
  });
}

}
