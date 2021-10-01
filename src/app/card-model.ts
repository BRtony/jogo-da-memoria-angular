/**
 * Exportando uma interface que mostra o status atual do card e o id da imagem do Pinterest
 */


export interface CardData {
    imageId: string;
    state: 'default' | 'flipped' | 'matched'; // informa qual o estado atual da carta e também é responsável por receber animações
    inUseF?: boolean
    inUseM?: boolean
    inUseH?: boolean
}