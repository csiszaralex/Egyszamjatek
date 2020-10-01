import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";
//import jatekos from ""

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Egyszámjáték</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        let megoldas: Megoldas;
        try {
            megoldas = new Megoldas("egyszamjatek.txt");
        } catch (error) {
            res.write("Hiba az egyszamjatek.txt állomány beolvasásakor\n");
            res.write(`Hibaüzenet: ${(error as Error).message}`);
            res.write("</pre></form>");
            res.write("</body></html>");
            res.end();
            return;
        }
        res.write(`3. feladat: Játékosok száma: ${megoldas.jatekosSzam}\n`);
        res.write(`4. feladat: Fordulok száma: ${megoldas.korokSzama}\n`);
        res.write(`5. feladat: Az első fordulóban${megoldas.voltEgyes ? "" : " nem"} volt egyes tipp!\n`);
        res.write(`6. feladat: A legnagyobb tipp a fordulók során: ${megoldas.legnagy}\n`);
        //7
        let be: number = parseInt(params.be as string);
        if (isNaN(be) || be < 1 || be > megoldas.korokSzama) {
            be = 1;
        }
        res.write(`7. feladat: Kérem a forduló sorszámát [1-${megoldas.korokSzama}]: <input type='number' name='be' value=${be} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        //8
        res.write(`8. feladat: A nyertes tipp a megadott fordulóban: ${megoldas.nyertes(be) === 99 ? "Nem volt egyedi tipp" : megoldas.nyertes(be)}\n`);
        //9
        res.write(`9. feladat: A megadott forduló nyertese: ${megoldas.nyertesEmber(be)}\n`);
        //10
        if (megoldas.nyertesEmber && megoldas.nyertes) {
            megoldas.allomanybaIr("nyertes.txt", megoldas.nyertesEmber(be), megoldas.nyertes(be), be);
        } else {
            res.write("10. feladat: Nem volt nyertes a megadott fordulóban!");
            try {
                fs.unlinkSync("nyertes.txt"); // állomány törlése
            } catch (error) {
                console.log(`Hiba: ${(error as Error).message}`);
            }
        }
        res.write("\n<u>Az egyszamjatek.txt file tartalma:</u>\n");
        fs.readFileSync("egyszamjatek.txt")
            .toString()
            .split("\n")
            .forEach(x => res.write(`${x}\n`));
        res.write("\n<u>A nyerte.txt file tartalma:</u>\n");
        fs.readFileSync("nyertes.txt")
            .toString()
            .split("\n")
            .forEach(x => res.write(`${x}\n`));
        res.write("\n<u>Github repository: </u><a href='https://github.com/csiszaralex/egyszamjatek'>GutHub</a>");
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
