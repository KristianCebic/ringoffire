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
    // Start game
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then( (gameInfo: any) => {
        console.log('GameInfo: ', gameInfo);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }
}



