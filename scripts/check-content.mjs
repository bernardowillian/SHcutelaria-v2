import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const bad = [];
const files = [];
function visit(dir) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, ent.name);
    if (ent.isDirectory()) visit(path);
    else if (/\.(astro|html|ts)$/.test(ent.name)) files.push(path);
  }
}
visit('src');
for (const file of files) {
  const code = readFileSync(file, 'utf8');
  // URLs em documentação não são links do produto. Examina apenas HTML renderizável.
  if (/href=["'](?:#|http:\/\/|)["']/.test(code)) bad.push(file + ': link vazio ou inseguro');
  if (/href=["'][^"']*login\.html/.test(code)) bad.push(file + ': login inexistente');
  if (/href=["'][^"']*rifa/.test(code)) bad.push(file + ': sorteio sem aprovação');
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
console.log('Guard de conteúdo: ' + files.length + ' arquivos examinados; sem links proibidos.');
