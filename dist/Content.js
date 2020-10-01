"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const url_1 = tslib_1.__importDefault(require("url"));
const Megoldas_1 = tslib_1.__importDefault(require("./Megoldas"));
class Content {
    content(req, res) {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs_1.default.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Egyszámjáték</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        const params = url_1.default.parse(req.url, true).query;
        let megoldas;
        try {
            megoldas = new Megoldas_1.default("egyszamjatek.txt");
        }
        catch (error) {
            res.write("Hiba az egyszamjatek.txt állomány beolvasásakor\n");
            res.write(`Hibaüzenet: ${error.message}`);
            res.write("</pre></form>");
            res.write("</body></html>");
            res.end();
            return;
        }
        res.write(`3. feladat: Játékosok száma: ${megoldas.jatekosSzam}\n`);
        res.write(`4. feladat: Fordulok száma: ${megoldas.korokSzama}\n`);
        res.write(`5. feladat: Az első fordulóban${megoldas.voltEgyes ? "" : " nem"} volt egyes tipp!\n`);
        res.write(`6. feladat: A legnagyobb tipp a fordulók során: ${megoldas.legnagy}\n`);
        let be = parseInt(params.be);
        if (isNaN(be) || be < 1 || be > megoldas.korokSzama) {
            be = 1;
        }
        res.write(`7. feladat: Kérem a forduló sorszámát [1-${megoldas.korokSzama}]: <input type='number' name='be' value=${be} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`8. feladat: A nyertes tipp a megadott fordulóban: ${megoldas.nyertes(be) === 99 ? "Nem volt egyedi tipp" : megoldas.nyertes(be)}\n`);
        res.write(`9. feladat: A megadott forduló nyertese: ${megoldas.nyertesEmber(be)}\n`);
        if (megoldas.nyertesEmber && megoldas.nyertes) {
            megoldas.allomanybaIr("nyertes.txt", megoldas.nyertesEmber(be), megoldas.nyertes(be), be);
        }
        else {
            res.write("10. feladat: Nem volt nyertes a megadott fordulóban!");
            try {
                fs_1.default.unlinkSync("nyertes.txt");
            }
            catch (error) {
                console.log(`Hiba: ${error.message}`);
            }
        }
        res.write("\n<u>Az egyszamjatek.txt file tartalma:</u>\n");
        fs_1.default.readFileSync("egyszamjatek.txt")
            .toString()
            .split("\n")
            .forEach(x => res.write(`${x}\n`));
        res.write("\n<u>A nyerte.txt file tartalma:</u>\n");
        fs_1.default.readFileSync("nyertes.txt")
            .toString()
            .split("\n")
            .forEach(x => res.write(`${x}\n`));
        res.write("\n<u>Github repository: </u><a href='https://github.com/csiszaralex/egyszamjatek'>GitHub</a>");
        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
exports.default = Content;
//# sourceMappingURL=Content.js.map