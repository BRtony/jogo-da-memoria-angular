import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CardData } from './card-model';
import { RestartDialogComponent } from './restart-dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
    inUseF: boolean
    inUseM: boolean
    inUseH: boolean
  cardImages = [
    '564x/42/19/8c/42198cf4fe33a5ea7714735f4b67cb30.jpg',
    // '564x/35/dc/ca/35dccaabebccbecd9880fbeb21dc7362.jpg',
    // '5UQLWAUS_6c',
    // 'sHGMUBA88Mc',
    // '_XdTZMuCXRM',
  ];
  cardImagesMedio = [
    // '564x/c6/1f/d0/c61fd03c7cfe93754d4d69b6e76616a0.jpg',
    // '236x/56/36/c8/5636c83ba30560b09704560188fe26b3.jpg',
    '564x/48/27/71/482771345c8ecbeb6d6ccaf3e66760f3.jpg',
    '236x/21/70/3a/21703a31d8693986a5234e66dd512503.jpg',
    '564x/ec/62/b0/ec62b02a41eef77fbbf65a4f5805d10a.jpg',
  ];
  cardImagesHard = [
    'GubApA69UZM',
    'sB1iOml907A',
    '5UQLWAUS_6c',
    'sHGMUBA88Mc',
    '_XdTZMuCXRM',
  ];
  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;


  /**
   * Converte em um array de arrays, com um número aleatório como primeiro membro e o objeto
   *  CardData como o segundo membro
   * 
   * Embaralha o array com base no primeiro membro, resultando em uma classificação aleatória
   * 
   * Converte de volta em um array do segundo membro que é o objeto CardData
   * @param anArray um array de cartas embaralhadas
   * @returns retorna o Array com cartas
   */
  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }
  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.showInicio();
  }

  showInicio():void {
  }

  /**
   * A função setupCards 
   * percorre nossos IDs de imagem, 
   * cria um objeto CardData para cada um e, 
   * em seguida, envia duas cópias do objeto 
   * para nosso array de cartões
   * 
   * @returns duas cópias de cada imagem ao objeto
   */


  /**
   * O operador @spread (...) é importante aqui, porque queremos novos objetos com os mesmos 
   * dados, não cópias por referência. Em cópias por referência, quando mudamos o estado de uma * das cartas, ele também mudará o estado de seu par!
   */

  setupCards(): boolean {
    this.inUseF = false
    this.inUseM = false
    this.inUseH = false
    this.matchedCount = 0;
    this.cards = [];

    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default',
      };
      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards)
    return this.inUseF = true
  }
  setupCardsMedio(): boolean {
    this.inUseF = false
    this.inUseM = false
    this.inUseH = false
    this.matchedCount = 0;
    this.cards = [];
    

    this.cardImagesMedio.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default',
      };
      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards);
    return this.inUseM = true
}
  setupCardsHard(): boolean {
    this.inUseF = false
    this.inUseM = false
    this.inUseH = false
    this.matchedCount = 0;
    this.cards = [];

    this.cardImagesHard.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default',
      };
      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards);

    return this.inUseH = true    
}

  /**
   * Primeiro alternamos o estado do cartão com base em seu estado atual. Se for 'default', mudamos para 'flipped' e vice versa.
   * Também mantemos um array chamado flippedCards para guardar as cartas que estão no estado 
   * invertido. Usaremos isso para verificar se há match. 
   * 
   * Por último evita-se a virada de mais de 2 cartas ao mesmo tempo. Para proibir isso,
   * adicionamos uma verificação extra no comprimento dos flippedCards. Isso desabilitará 
   * a mudança de estado se o usuário tocar em mais de 2 (> 2) cards consecutivamente.
   * @param index o índice no array de cartas
   */
  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.inUseF && this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        } 
        if (this.inUseM && this.matchedCount === this.cardImagesMedio.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
        if (this.inUseH && this.matchedCount === this.cardImagesHard.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
      }
    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }


  
  
}
