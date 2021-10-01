import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,  EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { CardData } from '../card-model'




/**
 * Um @trigger representa a definição de uma animação em Angular e contém um conjunto de estados
 *  e as transições entre eles. É definido como uma string e pode ser vinculado a qualquer 
 * elemento da UI
 * 
 * Um @state é um conjunto de propriedades semelhantes às propriedades de estilo CSS que devem
 * ser aplicadas ao elemento quando o estado está ativo. Especificamos o estado ao definir o trigger para um elemento no arquivo de modelo. Também podemos alterar esse estado dinamicamente, como veremos em breve!
 */

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})

/**
 * A interface do jogo. Aqui são passados input e output,
 * ou seja, o que será inserido e o que é retornado
 */
export class GameCardComponent implements OnInit {
  @Input() data: CardData; // passando cartas como input seguindo o model
  
  @Output() cardClicked = new EventEmitter(); 
  
  constructor() { }
  
  ngOnInit(): void {
  }

}
