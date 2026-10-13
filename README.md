# Lab 15 — IPFS + Pinata

Sesión 18.

## Título y objetivo

Comprender cómo un JSON no sensible obtiene una identidad por contenido, cómo se conserva y cómo se interpreta una recuperación.

## Instrucciones

En este laboratorio trabajamos en Visual Studio Code para desarrollar un informe sobre almacenamiento descentralizado utilizando un archivo venture-hello.json sin datos personales y una política de almacenamiento aplicada a un venture. Definimos una representación exacta en UTF-8, calculamos su SHA-256 y construimos un CIDv1 con codec raw para un único bloque pequeño, dejando explícito que este cálculo local no equivale a una publicación en IPFS. Explicamos el procedimiento de incorporación del archivo con IPFS, la relación entre bloques, multihash y direccionamiento por contenido, y la necesidad de mantener parámetros consistentes para obtener identificadores reproducibles. Describimos cómo Pinata conserva una copia mediante pinning y cómo un gateway HTTP recupera contenido identificado por CID, diferenciando respuestas ilustrativas de una consulta realmente ejecutada. Implementamos una experiencia interactiva que recorre archivo, CID, Pinata y gateway, compara dos variantes predefinidas del JSON y verifica los bytes del archivo local recuperado. Elaboramos STORAGE.md con categorías de sensibilidad, responsables, durabilidad, revisión y eliminación, distinguiendo materiales apropiados para publicación pública de información que requiere almacenamiento convencional. Analizamos disponibilidad, persistencia, dependencia del proveedor y los límites de retirar copias distribuidas. Entregamos el HTML, CSS, JavaScript, JSON y README correspondientes, con diagramas, matriz de clasificación, resultados calculados en el navegador y conclusiones sobre integridad y gobierno de datos.

## Descripción del trabajo

La visualización recorre cuatro etapas. Calculamos SHA-256 y CIDv1 raw; recuperamos el fixture desde Live Server para comparar bytes. El modelo de Pinata y gateway explica estados sin ejecutar servicios remotos. STORAGE.md establece responsables, durabilidad y reglas de retiro.

## Tecnologías

IPFS, CIDv1, raw, multihash SHA-256, base32, Pinata, gateways HTTP y Web Crypto. La interfaz utiliza HTML5, CSS3 y JavaScript sin CDN.

## Resultados

El fixture produce un CID local reproducible; cambiar version de 1 a 2 modifica hash e identidad. La comparación del original con el archivo local coincide. No se afirma una publicación o un pin remoto. La política diferencia información pública estable, temporal, interna y secreta.

## Aprendizaje

Aprendimos a relacionar bytes, hashing y direccionamiento por contenido, y comprendimos que disponibilidad y persistencia requieren decisiones operativas adicionales. Al elaborar STORAGE.md reconocimos que la clasificación de datos debe preceder a la publicación y que retirar un pin no elimina las copias distribuidas.

## Visualización

Abrimos la carpeta WEB3-LABS en Visual Studio Code. Con la extensión Live Server instalada, hacemos clic derecho en este index.html y elegimos **Open with Live Server**. La navegación principal está en ../index.html. Usamos localhost para Web Crypto; no se necesitan cuentas ni credenciales. Los controles se operan con Tab, Enter y Espacio.

## Rúbrica original

- CID de artefacto sin datos personales generado: 20%.
- Pin activo en Pinata o servicio equivalente: 20%.
- Resolución mediante gateway HTTP: 25%.
- STORAGE.md con clasificación de datos y políticas de almacenamiento: 25%.
- Comentarios de aprendizaje: 10%.

Total: 100%. Los alcances y límites se describen en la tabla HTML; no se asignan calificaciones por ejecuciones no realizadas.

## Alcance académico

Las simulaciones se identifican en pantalla; no representan conexiones, publicaciones ni transacciones externas. No se proporcionaron penalizaciones adicionales y no se inventan deducciones. Usamos contenido de prueba y no incluimos secretos.

## Fuentes primarias

- [IPFS · identificadores de contenido](https://docs.ipfs.tech/concepts/content-addressing/)
- [IPFS · persistencia y pinning](https://docs.ipfs.tech/concepts/persistence/)
- [Pinata · carga de archivos](https://docs.pinata.cloud/files/uploading-files)
- [Multiformats · especificación CID](https://github.com/multiformats/cid)
