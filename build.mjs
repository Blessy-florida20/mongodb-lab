// Reads scripts/*.js and generates index.html (run: node build.mjs)
import fs from "node:fs";
const titles = {
  "01_student_database.js": "1. Student Database Management",
  "02_employee_database.js": "2. Employee Database",
  "03_product_database.js": "3. Product Database",
  "04_library_database.js": "4. Library Database",
  "05_query_operations.js": "5. Query Operations",
};
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
let body = "", nav = "";
Object.keys(titles).forEach((file, i) => {
  const src = fs.readFileSync("scripts/" + file, "utf8").split("\n");
  const secs = []; let cur = null;
  for (const line of src) {
    const m = line.match(/^\/\/ @section (.*)/);
    if (m) { cur = { name: m[1], code: [] }; secs.push(cur); }
    else if (cur) cur.code.push(line);
  }
  const head = src.filter(l => l.startsWith("//") && !l.startsWith("// @section")).slice(0, 2).map(l => l.replace(/^\/\/\s?/, ""));
  nav += `<a href="#q${i+1}">Q${i+1}</a>`;
  body += `<section class="card" id="q${i+1}"><h2>${titles[file]}</h2><p class="muted">${esc(head[0].replace(/^Q\d\.\s*/,""))}</p>`;
  for (const s of secs) {
    const code = s.code.join("\n").trim();
    body += `<h3>${esc(s.name)}</h3><div class="code"><button class="copy">Copy</button><pre>${esc(code)}</pre></div>`;
  }
  body += `<p class="muted">Run: <code>mongosh --file scripts/${file}</code></p></section>`;
});
const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ex. No. 9 | Working with MongoDB using Shell Commands</title>
<style>
:root{--primary:#e63946;--primary-dark:#c1121f;--dark:#111827;--dark-2:#1f2937;--light:#f4f6f9;--card:#fff;--text:#1f2937;--muted:#6b7280;--border:#d9dee6;--radius:14px;--shadow:0 8px 24px rgba(17,24,39,.08)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",system-ui,Arial,sans-serif;background:var(--light);color:var(--text);line-height:1.6}
.container{width:min(1000px,92%);margin:0 auto}
header{background:var(--dark);position:sticky;top:0;z-index:5;box-shadow:0 2px 10px rgba(0,0,0,.25)}
.bar{display:flex;align-items:center;justify-content:space-between;min-height:60px;flex-wrap:wrap;gap:6px}
.brand{color:#fff;font-weight:800;letter-spacing:1px}.brand span{color:var(--primary)}
nav a{color:#d1d5db;padding:6px 12px;border-radius:8px;text-decoration:none;font-weight:500}
nav a:hover{background:var(--primary);color:#fff}
.hero{background:linear-gradient(135deg,var(--dark),var(--dark-2));color:#fff;padding:60px 0}
.eyebrow{color:var(--primary);font-weight:700;text-transform:uppercase;letter-spacing:2px;font-size:.8rem}
.hero h1{font-size:clamp(1.8rem,5vw,3rem);line-height:1.1;margin:8px 0 12px}
.hero p{color:#d1d5db;max-width:700px}
main{padding:40px 0}
.card{background:var(--card);border-radius:var(--radius);padding:28px;box-shadow:var(--shadow);margin-bottom:24px}
.card h2{margin-bottom:4px;color:var(--dark)}
.card h3{margin:18px 0 8px;font-size:1rem;color:var(--primary-dark)}
.muted{color:var(--muted);font-size:.92rem;margin-top:10px}
.code{position:relative}
pre{background:var(--dark);color:#e5e7eb;padding:16px;border-radius:10px;overflow-x:auto;font-size:.88rem;line-height:1.5}
code{font-family:Consolas,monospace;background:#eef0f4;padding:2px 6px;border-radius:5px}
.copy{position:absolute;top:8px;right:8px;background:var(--primary);color:#fff;border:0;border-radius:8px;padding:5px 12px;font-weight:600;cursor:pointer}
.copy:hover{background:var(--primary-dark)}
footer{background:var(--dark);color:#d1d5db;text-align:center;padding:22px 0;font-size:.9rem}
@media(max-width:640px){.card{padding:18px}.hero{padding:40px 0}}
</style></head><body>
<header><div class="container bar"><div class="brand">FITLIFE <span>TRAINING</span></div><nav>${nav}</nav></div></header>
<section class="hero"><div class="container"><p class="eyebrow">Ex. No: 9</p><h1>Working with MongoDB using Shell Commands</h1>
<p>Creating databases and collections, inserting, retrieving, updating and deleting documents, and querying data with mongosh.</p></div></section>
<main class="container">${body}</main>
<footer>© 2026 FitLife Training Center. Ex. No. 9, MongoDB Shell Commands.</footer>
<script>
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",()=>{
  navigator.clipboard.writeText(b.nextElementSibling.innerText).then(()=>{b.textContent="Copied!";setTimeout(()=>b.textContent="Copy",1500)})
}));
</script></body></html>`;
fs.writeFileSync("index.html", html);
console.log("index.html written,", html.length, "bytes");
