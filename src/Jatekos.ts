export class Jatekos {
    public nev: string;
    private _tippek: number[] = [];
    public get korokSzama(): number {
        return this._tippek.length;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.nev = m[0];
        for (let i = 1; i < m.length; i++) {
            this._tippek.push(parseInt(m[i]));
        }
    }
    public get egyes(): boolean {
        let van: boolean = false;
        if (this._tippek[0] === 1) {
            van = true;
        }
        return van;
    }
    public get legnagy(): number {
        // let maxi: number = 0;
        // for (const i of this._tippek) {
        //     if (i > maxi) {
        //         maxi = i;
        //     }
        // }
        // return maxi;
        return Math.max(...this._tippek.values());
    }
    public aktSzam(be: number): number {
        be--;
        return this._tippek[be];
    }
}
