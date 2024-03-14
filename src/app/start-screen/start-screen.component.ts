import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterModule, Router } from '@angular/router';
import { Game } from '../../models/game';
import { log } from 'console';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})

export class StartScreenComponent {
  
  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    
  }

  newGame() {
    let game = new Game();
    const gameData: { [key: string]: any } = game.toJson();
  
    for (const key in gameData) {
      if (gameData[key] === undefined) {
        delete gameData[key];
      }
    }
  
    this.firestore
      .collection('games')
      .add(gameData)
      .then(gameInfo => {
        console.log('GameInfo: ', gameInfo);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }
  
  
}



