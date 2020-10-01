"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const url_1 = tslib_1.__importDefault(require("url"));
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
        res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'>");
        res.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'>");
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'>");
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        const params = url_1.default.parse(req.url, true).query;
        res.write("Egyszerű Hello World!\n");
        res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");
        let korod = parseInt(params.kor);
        if (isNaN(korod))
            korod = 18;
        res.write(`Kérem a korod: <input type='number' name='kor' value=${korod} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`Te ${korod} éves vagy!\n`);
        res.write("Material Design for Bootstrap input demo:");
        let email = params.email;
        if (!email)
            email = "";
        res.write("<div class='md-form  md-outline'><i class='fas fa-envelope prefix'></i>");
        res.write(`<input type='text' name='email' id='email'  style='max-width:300px;' class='form-control' value='${email}' onChange='this.form.submit();'>`);
        res.write("<label for='email'>E-mail cím</label></div>");
        res.write(`Te e-mail címed: ${email}\n`);
        res.write("</pre></form>");
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>");
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js'></script>");
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js'></script>");
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/js/mdb.min.js'></script>");
        res.write("</body></html>");
        res.end();
    }
}
exports.default = Content;
//# sourceMappingURL=Content_extra.js.map