# The Drakeneess Codex · Dirección visual

**Rama de integración visual:** `test/codex-unified-design`. Todos los ajustes de UI se revisan juntos en esta rama; `master` se reserva para una versión visual aprobada. No crear una rama nueva para cada ajuste cosmético.

## Un solo sistema, tres superficies

1. **Códice / inicio / catálogo.** Identidad institucional: negro, guinda, platino, sello D y navegación de sitio. Header/footer globales solo aquí y en vistas estándar que realmente los necesitan.
2. **Ficha personalizada de obra.** La obra controla composición y paleta dentro del iframe aislado. No se duplica el header del sitio. Debe existir una salida al inicio del Códice fuera del iframe, con el mismo sello D.
3. **Lector de capítulos.** Prioridad absoluta a legibilidad y estabilidad. La navegación contextual vive en el panel del lector; siempre hay retorno tanto a la obra como al inicio del Códice. No duplicar header/footer globales.

## Jerarquía e identidad

- El **sello D** y el destino `/` son comunes y usan `CodexSeal` / `CodexReturnLink`. El contexto decide escala y disposición, no reinventa el vínculo.
- Variables `--codex-*` corresponden a la identidad institucional; `--story-*` a la obra y al lector.
- No convertir una ficha en un sitio completamente ajeno: conservar una salida identificable al Codex, pero sin invadir la portada.
- Una navegación clara es preferible a varias capas decorativas.
- Tipografía: títulos literarios con serif; navegación breve, etiquetas y contenido de lectura priorizan legibilidad.

## Contrato de comportamiento

- Las landings HTML/CSS mantienen **un solo scroll dentro del iframe**; el exterior no debe scrollar y no se ejecuta JavaScript editorial.
- El lector **no** adopta los scrolls de la landing. Preserva `reader-shell`, sus filas explícitas `auto minmax(0,1fr)`, su scroller interno, y el encadenamiento normal del scroll hacia la página exterior.
- Evitar blur, backdrop-filter, animaciones infinitas y capas fixed decorativas dentro del lector.
- El lector antiguo y el tema `fossil` deben seguir funcionando.
- Nunca usar cambios globales de `body overflow` sin un selector inequívoco de ruta.

## Checklist antes de integrar a master

- Inicio, catálogo, ficha normal, ficha personalizada y lector: escritorio y móvil.
- Nunca doble navbar; navegación de vuelta presente en todas las superficies.
- Ni ficha vacía ni tres scrollbars superpuestas.
- Probar scroll rápido en Opera/Chromium; sin bloques negros, sin footer oculto en rutas donde corresponde.
- Tests `npm run test:layout`, `npm run build`, `npm run lint` y revisión visual local.
- Si una vista falla, corregirla **en la misma rama de pruebas** antes de abrir un merge de producción.
