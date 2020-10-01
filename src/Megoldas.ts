import { Jatekos } from "./Jatekos";
import fs from "fs";

export default class Megoldas {
    private _jatekosok: Jatekos[] = [];
    public get jatekosSzam(): number {
        return this._jatekosok.length;
    }
    public get korokSzama(): number {
        return this._jatekosok[0].korokSzama;
    }
    public get voltEgyes(): boolean {
        let van: boolean = false;
        for (const i of this._jatekosok) {
            if (i.egyes) {
                van = true;
                break;
            }
        }
        return van;
    }
    public get legnagy(): number {
        let maxi: number = 0;
        for (const i of this._jatekosok) {
            if (i.legnagy > maxi) {
                maxi = i.legnagy;
            }
        }
        return maxi;
    }
    public nyertes(be: number): number {
        let szam: number = 99;
        for (const i of this._jatekosok) {
            if (i.aktSzam(be) < szam) {
                let seged: number = 0;
                for (const j of this._jatekosok) {
                    if (j.aktSzam(be) == i.aktSzam(be)) {
                        seged++;
                    }
                }
                if (seged === 1) {
                    szam = i.aktSzam(be);
                }
            }
        }
        return szam;
    }
    public nyertesEmber(be: number): string {
        const szam: number = this.nyertes(be);
        for (const i of this._jatekosok) {
            if (i.aktSzam(be) === szam) {
                return i.nev;
            }
        }
        return "";
    }
    public allomanybaIr(allomany: string, nev: string, tipp: number, fordulo: number): void {
        const ki: string[] = [];
        ki.push(`Forduló sorszáma: ${fordulo}.`);
        ki.push(`Nyertes tipp: ${tipp}`);
        ki.push(`Nyertes játékos: ${nev}`);
        fs.writeFileSync(allomany, ki.join("\r\n"));
    }
    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(x => {
                const aktSor: string = x.trim();
                this._jatekosok.push(new Jatekos(aktSor));
            });
    }
}
