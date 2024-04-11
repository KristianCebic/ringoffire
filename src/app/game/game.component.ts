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
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent, 
    MatIconModule, 
    MatDialogModule, 
    GameInfoComponent,
    PlayerMobileComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game;
  gameId!: string;
  gameOver = false

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
    ) { this.game = new Game(); }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true
    } else if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
        
        this.saveGame();

      setTimeout(()=>{
        if (this.game.currentCard) {
          this.game.playedCards.push(this.game.currentCard);
        }
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
  }
}

editPlayer(playerId: number) {
  const dialogRef = this.dialog.open(EditPlayerComponent)

  dialogRef.afterClosed().subscribe((change: string) => {
    if (change) {
      if(change == 'DELETE') {
        this.game.players.splice(playerId, 1)
        this.game.player_images.splice(playerId, 1)
      } else {       
        this.game.player_images[playerId] = change;
      }
      this.saveGame()
    }
  });
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.length > 0)
    this.game.players.push(name)
    this.game.player_images.push('boy.png')
    this.saveGame();
  });
}

saveGame() {
  this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson());
}

}
