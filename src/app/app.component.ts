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
    private inUseF: boolean
    private inUseM: boolean
    private inUseH: boolean

    /**
     * Os arrays @cardImages armazena as strings @imageId 
     */
     
  cardImages = [
    '564x/1b/e6/92/1be69269b718b0885efa99c180ed4ac7.jpg',
    '564x/02/ce/41/02ce41e3c7184ddb85b45e44e5d73103.jpg',
  ];
  cardImagesMedio = [
    '564x/c6/1f/d0/c61fd03c7cfe93754d4d69b6e76616a0.jpg',
    '236x/56/36/c8/5636c83ba30560b09704560188fe26b3.jpg',
    '564x/48/27/71/482771345c8ecbeb6d6ccaf3e66760f3.jpg',
    '236x/21/70/3a/21703a31d8693986a5234e66dd512503.jpg',
    '564x/ec/62/b0/ec62b02a41eef77fbbf65a4f5805d10a.jpg',
  ];
  cardImagesHard = [
    '564x/ce/02/76/ce0276335be47791cd196e0471cbbf70.jpg',
    '564x/74/61/1f/74611f69825d3f0ce7311b58aa4a762b.jpg',
    '564x/50/4d/b6/504db65eb3d901e35e9734633a5f2076.jpg',
    '564x/a1/94/2b/a1942b622130ef39abb85f2efee9f172.jpg',
    '564x/34/9b/5b/349b5b240c2cf6d1eb3a3484d3871a9c.jpg',
    '564x/15/00/f2/1500f2cc3c59899d151853012726e1a5.jpg',
    '564x/8d/aa/15/8daa154572b2e3b0f9ba6545ad8a19da.jpg',
    '564x/11/05/a0/1105a0a460405c6412b3a4f37504861f.jpg',
    '564x/20/9b/6a/209b6af6042f993ef762cd5ff94ea6c3.jpg',
    '564x/e2/74/cc/e274cc223e1cab9167e31fde01aad7d4.jpg',
    '564x/57/09/0c/57090c9064bebaa07035f2e47edc7902.jpg',
    '564x/49/cb/61/49cb611b1d035b83ce5ee9d87d3d9096.jpg',
    '564x/c3/fc/ec/c3fcec0b961116f12540a52bfd745d17.jpg',
    '564x/f8/f5/ae/f8f5aeacec2defd58e6d370362b939b6.jpg',
    '564x/4f/92/c7/4f92c76cbc9bf127ce1f3783b1974673.jpg',
  ];

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.showInicio();
  }

  showInicio():void {
  }

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

  /**
   * A função setupCards percorre nossos IDs de imagem, 
   * cria um objeto CardData para cada um e, em seguida,
   * envia duas cópias do objeto para nosso array de cartões
   * 
   * @returns duas cópias de cada imagem e
   * retorna se o método foi iniciado (inUseF = true)
   * 
   * O operador @spread (...) é importante aqui, 
   * porque queremos novos objetos com os mesmos 
   * dados, não cópias por referência. Em cópias
   * por referência, quando mudamos o estado de
   * uma das cartas, ele também mudará o estado de seu par.
   */

  setupCards(): boolean {
    this.inUseF = false
    this.inUseM = false
    this.inUseH = false
    this.matchedCount = 0; // contador de pares zerado
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

  /**
   * Assim que uma carta é virada e o flippedCards tem um length de 2,
   * usamos essas informações para verificar se as cartas formam um par.
   * 
   * Primeiro, descobrimos qual deve ser o próximo estado das cartas
   * com base no fato de seu imageId ser igual ou não. Se eles corresponderem,
   * definimos como um par (matched). Caso contrário, nós os redefinimos para o padrão (default).
   * 
   * Em seguida, colocamos as duas cartas no estado acima, acionando suas animações. No caso de 
   * 'matched', as cartas desaparecem no cosmos. Caso contrário, elas voltam 
   * para suas posições 'default' para que o usuário possa selecionar duas outras cartas.
   * Também redefinimos os flippedCards para vazio.
   * 
   * Por último, precisamos verificar quando todas as cartas foram combinadas. 
   * Para isso, simplesmente mantemos um contador chamado matchedCount e o
   * incrementamos quando houver um match. Assim que o matchedCount
   * for igual ao número de imagens que temos, mostramos um modal do angular/material
   * parabenizando o usuário e permitindo que ele volte à tela inicial para escolher um novo jogo.
   */

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


  /**
   * Com nosso jogo da memória totalmente funcional,
   * a última coisa que precisamos fazer é permitir que 
   * o usuário reinicie o jogo. Podemos simplesmente chamar nossa 
   * função showInicio e redefinir o matchedCount para 0.
   */
  restart(): void {
    this.matchedCount = 0;
    if(this.inUseF){
    this.setupCards();
    } else if (this.inUseM){
    this.setupCardsMedio();
    } else if (this.inUseH){
    this.setupCardsHard();
    } else {
      this.showInicio();
    }
  }


  
  
}
