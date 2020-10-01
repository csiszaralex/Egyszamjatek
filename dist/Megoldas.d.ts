export default class Megoldas {
    private _jatekosok;
    get jatekosSzam(): number;
    get korokSzama(): number;
    get voltEgyes(): boolean;
    get legnagy(): number;
    nyertes(be: number): number;
    nyertesEmber(be: number): string;
    allomanybaIr(allomany: string, nev: string, tipp: number, fordulo: number): void;
    constructor(forras: string);
}
