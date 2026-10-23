# PAP · Primeros Auxilios Psicológicos

Biblioteca estática y accesible en español para `https://pap.rodolfovalle.com/`.

## Contenido

- Página principal con búsqueda en cliente y filtros, 12 artículos enlazables.
- 3 herramientas locales: orientador PAP (no clínico), anclaje sensorial y checklist imprimible.
- Artículos con fuentes oficiales e investigación revisada por pares.
- Contactos oficiales de emergencia para Chile, privacidad editorial y autoría visible en portada, artículos y herramientas.
- Página `sobre-el-creador.html` y dos fotografías Unsplash con crédito y enlaces a las licencias.
- Metadatos SEO y `schema.org`, `robots.txt`, `sitemap.xml` y `CNAME`.
- Sin librerías JS externas, cookies publicitarias, SDKs de terceros ni almacenamiento de respuestas. Las dos fotografías se cargan desde Unsplash (recurso externo; ver privacidad).

## Publicación en GitHub Pages

1. Crea un repositorio público (por ejemplo `pap`) en tu cuenta GitHub.
2. Sube **el contenido de esta carpeta a la raíz** del repositorio: `index.html`, `styles.css`, `app.js`, `tools.js`, `biblioteca/`, `herramientas/`, `CNAME`, etc. **No** subas la carpeta contenedora como subdirectorio si deseas que sirva desde la raíz.
3. En Settings > Pages selecciona `Deploy from a branch`, rama `main`, directorio `/(root)`.
4. En Pages, configura el dominio personalizado `pap.rodolfovalle.com` si no se detecta a partir del archivo CNAME.
5. En el DNS de `rodolfovalle.com`, agrega el subdominio `pap` como **CNAME** apuntando a `<TU_USUARIO_GITHUB>.github.io`. **Sustituye** el placeholder; no inventes el usuario.
6. Cuando el certificado esté emitido, activa `Enforce HTTPS` en GitHub Pages. La emisión puede tardar.
7. Comprueba `https://pap.rodolfovalle.com`, todos los enlaces internos y `https://pap.rodolfovalle.com/sitemap.xml`.
8. Registra la propiedad en Google Search Console; envía el sitemap si corresponde.

**Nota**: El DNS y el repositorio no se han modificado. La carpeta no está publicada por el mero hecho de generarse.

## Prueba local

Abre `index.html` en un navegador, o sirve la carpeta con:

```bash
python3 -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Criterio clínico

PAP es una intervención de apoyo informada por evidencia. Esta biblioteca no equivale a atención en tiempo real, evaluación clínica, protocolo de triaje ni formación acreditada. La literatura sobre desenlaces clínicos presenta limitaciones; ver `biblioteca/evidencia-y-limites.html`.

## Mantenimiento

Revisar periódicamente números telefónicos oficiales, URLs de guías, referencias científicas y fecha de revisión editorial. Actualizar `sitemap.xml` y `dateModified` cuando se modifique contenido sustancial. Evitar añadir seguimiento/analítica sin actualizar la política de privacidad.

© 2026 Rodolfo Valle. Contenido original de divulgación. Las fuentes externas mantienen sus propias licencias.

## Actualización v1.1 (23/10/2026)

Revisión documental no equivalente a validación clínica independiente. Las fotos se sirven desde Unsplash y podrían generar solicitudes de red a ese proveedor. Actualizada política de privacidad. Añadida página de autoría y créditos.
