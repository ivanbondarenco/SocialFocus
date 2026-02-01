# Social Focus - Bloqueador de Distracciones

Social Focus es una extension de navegador diseñada para mejorar la productividad personal reduciendo las distracciones digitales. Permite al usuario recuperar el control de su tiempo limitando el acceso a redes sociales adictivas y limpiando la interfaz de plataformas de video.

## Funcionalidades Principales

### 1. Bloqueo de Redes Sociales
La extension bloquea completamente el acceso a los siguientes dominios para evitar la navegacion compulsiva:
- Facebook
- Instagram
- TikTok
- Reddit
- Snapchat
- LinkedIn

### 2. Limite de Tiempo para X (Twitter)
Implementa un sistema de control de tiempo para X (anteriormente Twitter):
- Permite un uso maximo de 20 minutos diarios.
- Realiza un seguimiento del tiempo en segundo plano.
- Bloquea el acceso automaticamente una vez superado el limite diario.
- El contador se reinicia automaticamente cada dia.

### 3. YouTube en Modo Enfoque
Modifica la interfaz de YouTube para minimizar distracciones visuales sin impedir el uso funcional de la plataforma:
- **Feed de Inicio Limpio**: Mantiene visibles las recomendaciones de la pagina de inicio.
- **Recordatorio de Enfoque**: Muestra un banner permanente en la pagina principal recordando al usuario mantener la concentracion.
- **Eliminacion de Ruido**:
  - Oculta la barra lateral de recomendaciones "A continuacion" en las paginas de video.
  - Oculta la seccion de comentarios.
  - Elimina la pestaña de Shorts.
  - Oculta las sugerencias de video al finalizar una reproduccion (End Screens).

## Instalacion (Modo Desarrollador)

1. Descarga o clona este repositorio en tu equipo.
2. Abre Google Chrome y navega a `chrome://extensions`.
3. Activa el interruptor "Modo de desarrollador" en la esquina superior derecha.
4. Haz clic en el boton "Cargar descomprimida" (Load unpacked).
5. Selecciona la carpeta raiz del proyecto (`Make - Extension`).

## Privacidad

Esta extension funciona localmente en tu navegador. No recopila datos de navegacion, no envia informacion a servidores externos y no rastrea tu actividad fuera de los dominios especificamente controlados para las funciones de bloqueo.
