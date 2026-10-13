# STORAGE — Política de almacenamiento de Aurora

## Objetivo y alcance

Aurora es un venture ficticio utilizado para estudiar gobierno de datos. Definimos esta política antes de publicar: un CID acredita identidad de contenido, pero no confidencialidad, disponibilidad universal ni borrado futuro. La política se aplica a documentación, demostraciones y registros del venture.

## Clasificación

| Sensibilidad y durabilidad | Ejemplo | Almacenamiento | Responsable | Conservación |
| --- | --- | --- | --- | --- |
| Público, estable | Manual técnico aprobado y JSON de prueba | IPFS público; dos copias retenidas por operadores independientes | Documentación | Revisión semestral y presupuesto anual |
| Público, temporal | Anuncios y campañas | Web convencional con vencimiento | Comunicación | Retirar al terminar vigencia |
| Interno | Informes de operación | Repositorio privado y control de acceso | Operaciones | Plazo vinculado a finalidad; revisión trimestral |
| Personal o contractual | Expedientes y contratos | Almacenamiento privado cifrado; acceso mínimo | Responsable de datos | Plazo justificado por finalidad y obligaciones aplicables |
| Secreto | Credenciales, claves de firma | Gestor de secretos y protección local | Seguridad | Rotación, revocación y eliminación controlada |

## Reglas de publicación

Publicamos en IPFS público solo contenidos aprobados como públicos, sin datos personales, sin secretos y adecuados para copia persistente por terceros. Revisamos nombres, propiedades JSON y metadatos antes de incorporar el objeto. El cifrado no convierte automáticamente contenido sensible en material apto para publicación permanente: una copia cifrada puede sobrevivir y perder confidencialidad si la clave se expone después.

Nunca publicamos claves privadas, tokens de API, contraseñas, datos identificables de clientes o información cuyo retiro efectivo dependa de controlar todas las copias. Los materiales con vigencia corta se mantienen en almacenamiento convencional para gestionar versiones y vencimientos.

## Integridad, copias y disponibilidad

Documentación conserva el original binario, sus parámetros de importación y el CID calculado. Los documentos públicos estables requieren dos copias con responsabilidades identificadas. Mensualmente se comprueba recuperación e integridad; una respuesta HTTP exitosa no sustituye la comparación del contenido. Se revisan estados de pinning, límites de cuenta, costos y capacidad de migrar de proveedor.

El archivo venture-hello.json es el fixture del laboratorio: UTF-8 sin BOM ni salto final, CIDv1 raw y multihash SHA-256. El cálculo local no demuestra un pin remoto. La demostración recupera el archivo desde Live Server.

## Retiro y eliminación

Cuando un documento público pierde vigencia, retiramos enlaces propios y pins administrados. Conservamos una comunicación de versión vigente cuando la finalidad lo justifica. No afirmamos que esto elimine copias ajenas, cachés o descargas. Para datos privados, aplicamos vencimiento en sistemas bajo nuestro control y gestionamos también respaldos según su ciclo de retención.

## Aprendizaje

Comprendimos que la elección de IPFS requiere decidir primero qué puede hacerse público y quién conserva las copias. Integridad, accesibilidad y eliminación son propiedades diferentes y necesitan políticas explícitas.
