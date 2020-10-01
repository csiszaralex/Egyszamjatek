"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jatekos = void 0;
class Jatekos {
    constructor(sor) {
        this._tippek = [];
        const m = sor.split(" ");
        this.nev = m[0];
        for (let i = 1; i < m.length; i++) {
            this._tippek.push(parseInt(m[i]));
        }
    }
    get korokSzama() {
        return this._tippek.length;
    }
    get egyes() {
        let van = false;
        if (this._tippek[0] === 1) {
            van = true;
        }
        return van;
    }
    get legnagy() {
        return Math.max(...this._tippek.values());
    }
    aktSzam(be) {
        be--;
        return this._tippek[be];
    }
}
exports.Jatekos = Jatekos;
//# sourceMappingURL=Jatekos.js.map