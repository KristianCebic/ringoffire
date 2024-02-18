import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})

export class StartScreenComponent {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  newGame() {
    // Start game
    this.router.navigateByUrl('/game');
  }
}



