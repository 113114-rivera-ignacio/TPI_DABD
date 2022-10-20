import { Carta } from "./carta";

export class CartasConId{
    idCarta: string;
    idUsuario: number;

    constructor (idCarta : string ,  idUsuario: number){
        this.idCarta = idCarta;
        this.idUsuario = idUsuario;
    }
}