// Mejoras progresivas: el contenido sigue visible sin JavaScript.
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const text = (selector, value) => { $(selector).textContent = value; };
const press = (selector, active) => $$(selector).forEach(button => {
  button.setAttribute('aria-pressed', String(button === active));
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .04 });
  $$('.concept-card, .diagram, .section-heading').forEach(element => {
    element.classList.add('will-reveal'); observer.observe(element);
  });
}
// Un solo tokenizador preserva el texto y evita insertar HTML del código fuente.
const token = /(\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|await|async|import|from|return|if|else|new|true|false|try|catch|while)\b|\b\d+(?:\.\d+)?\b)/g;
$$('code[data-language]').forEach(element => {
  const source = element.textContent, fragment = document.createDocumentFragment();
  let cursor = 0;
  for (const match of source.matchAll(token)) {
    fragment.append(document.createTextNode(source.slice(cursor, match.index)));
    const span = document.createElement('span');
    const value = match[0];
    span.className = 'syntax-' + (/^(\/\/|#)/.test(value) ? 'comment' : /^["']/.test(value) ? 'string' : /^\d/.test(value) ? 'number' : 'keyword');
    span.textContent = value; fragment.append(span); cursor = match.index + value.length;
  }
  fragment.append(document.createTextNode(source.slice(cursor))); element.replaceChildren(fragment);
});


const original = '{"venture":"Aurora","mensaje":"Hola, Web3","version":1}';
const modified = '{"venture":"Aurora","mensaje":"Hola, Web3","version":2}';
const stages = [
  ['Archivo / bytes exactos', 'UTF-8, sin BOM y sin salto final. Igualdad semántica de JSON no significa igualdad de bytes.'],
  ['CID / identidad del bloque', 'El codec raw permite identificar este bloque pequeño directamente. Versión, codec y multihash también forman parte del CID.'],
  ['Pinata / conservación', 'Modelo: un proveedor mantiene una copia. El CID no garantiza que esa copia exista ni que una cuenta la conserve indefinidamente.'],
  ['Gateway / recuperación', 'Modelo: HTTP entrega contenido por CID. La comprobación real de esta página lee el fixture desde Live Server, no desde un gateway IPFS.']
];
$$('[data-stage]').forEach(button => button.addEventListener('click', () => {
  press('[data-stage]', button); const [title, explanation] = stages[Number(button.dataset.stage)];
  text('#stage-title', title); text('#stage-text', explanation);
}));
function base32(bytes) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz234567';
  let output = '', bits = 0, value = 0;
  for (const byte of bytes) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 5) { bits -= 5; output += alphabet[(value >>> bits) & 31]; }
    value &= (1 << bits) - 1;
  }
  if (bits) output += alphabet[(value << (5 - bits)) & 31];
  return output;
}
let calculation = 0;
async function showVariant(value) {
  const operation = ++calculation;
  text('#json-output', value);
  try {
    if (!crypto.subtle) throw new Error('Web Crypto requiere localhost o HTTPS. Abrimos esta página con Live Server.');
    const bytes = new TextEncoder().encode(value);
    const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
    const response = await fetch('venture-hello.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('El archivo local no pudo recuperarse: HTTP ' + response.status);
    const recovered = new Uint8Array(await response.arrayBuffer());
    if (operation !== calculation) return;
    text('#hash-output', [...digest].map(byte => byte.toString(16).padStart(2, '0')).join(''));
    text('#cid-output', 'b' + base32(new Uint8Array([1, 0x55, 0x12, 32, ...digest])));
    const equal = recovered.length === bytes.length && recovered.every((byte, index) => byte === bytes[index]);
    text('#comparison-output', equal ? 'Coinciden los ' + bytes.length + ' bytes del archivo local. Recuperación real desde Live Server.' : 'No coinciden: la variante versión 2 difiere del fixture original. Recuperación local, sin gateway remoto.');
  } catch (error) {
    if (operation !== calculation) return;
    text('#hash-output', 'Cálculo no disponible'); text('#cid-output', 'Cálculo no disponible');
    text('#comparison-output', error.message);
  }
}
$$('[data-variant]').forEach(button => button.addEventListener('click', () => {
  press('[data-variant]', button); showVariant(button.dataset.variant === 'original' ? original : modified);
}));
$('#pin-toggle').addEventListener('click', () => {
  const active = $('#pin-toggle').getAttribute('aria-pressed') !== 'true';
  $('#pin-toggle').setAttribute('aria-pressed', String(active));
  text('#pin-toggle', active ? 'Modelo: pin activo' : 'Modelo: pin retirado');
  text('#pin-output', active ? 'Una copia retenida aumenta disponibilidad. No garantiza permanencia universal.' : 'Retirar nuestro pin elimina una obligación de conservación propia; otras copias y cachés pueden permanecer.');
});
showVariant(original);