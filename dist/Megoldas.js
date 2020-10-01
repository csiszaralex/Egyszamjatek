"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Jatekos_1 = require("./Jatekos");
const fs_1 = tslib_1.__importDefault(require("fs"));
class Megoldas {
    constructor(forras) {
        this._jatekosok = [];
        fs_1.default.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(x => {
            const aktSor = x.trim();
            this._jatekosok.push(new Jatekos_1.Jatekos(aktSor));
        });
    }
    get jatekosSzam() {
        return this._jatekosok.length;
    }
    get korokSzama() {
        return this._jatekosok[0].korokSzama;
    }
    get voltEgyes() {
        let van = false;
        for (const i of this._jatekosok) {
            if (i.egyes) {
                van = true;
                break;
            }
        }
        return van;
    }
    get legnagy() {
        let maxi = 0;
        for (const i of this._jatekosok) {
            if (i.legnagy > maxi) {
                maxi = i.legnagy;
            }
        }
        return maxi;
    }
    nyertes(be) {
        let szam = 99;
        for (const i of this._jatekosok) {
            if (i.aktSzam(be) < szam) {
                let seged = 0;
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
    nyertesEmber(be) {
        const szam = this.nyertes(be);
        for (const i of this._jatekosok) {
            if (i.aktSzam(be) === szam) {
                return i.nev;
            }
        }
        return "";
    }
    allomanybaIr(allomany, nev, tipp, fordulo) {
        const ki = [];
        ki.push(`Forduló sorszáma: ${fordulo}.`);
        ki.push(`Nyertes tipp: ${tipp}`);
        ki.push(`Nyertes játékos: ${nev}`);
        fs_1.default.writeFileSync(allomany, ki.join("\r\n"));
    }
}
exports.default = Megoldas;
//# sourceMappingURL=Megoldas.js.map