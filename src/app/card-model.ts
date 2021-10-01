/**
 * Exportando uma interface que mostra o status atual do card e o id da imagem no Unsplash
 */


export interface CardData {
    imageId: string;
    state: 'default' | 'flipped' | 'matched';
    inUseF?: boolean
    inUseM?: boolean
    inUseH?: boolean
}