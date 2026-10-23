# The Drakeneess Codex

Frontend público de lectura para las historias y material editorial de **The Darkest Advance**. El Codex no contiene manuscritos privados: consume exclusivamente la API pública del Writer server mediante `CODEX_API_URL`.

## Desarrollo local

Copia la configuración de ejemplo y levanta el Writer server en el puerto 3001:

```bash
cp .env.example .env.local
npm install
npm run dev
```

La configuración local esperada es:

```env
CODEX_API_URL=http://localhost:3001
```

`CODEX_API_URL` es una variable **server-only**. No debe exponerse como `NEXT_PUBLIC_CODEX_API_URL`.

## Entornos

| Entorno | Codex | Writer API |
| --- | --- | --- |
| Desarrollo | `http://localhost:3000` | `http://localhost:3001` |
| Producción | `https://codex.thedarkestadvance.com` | `https://thedarkestadvance-production.up.railway.app` |
| Preview de Vercel | URL generada por Vercel | `https://thedarkestadvance-production.up.railway.app` salvo override específico |

En Vercel, `CODEX_API_URL` está configurada para los targets `production` y `preview`.

## Contrato de contenido

El frontend consulta únicamente endpoints anónimos bajo `/api/public`. Las rutas privadas de sincronización y publicación (`/api/sync` y `/api/publishing`) pertenecen al Writer server y no forman parte del contrato del Codex.

Los capítulos remotos se renderizan mediante el renderer editorial controlado del Codex; el contenido remoto no se ejecuta como JavaScript arbitrario.

## Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
```
