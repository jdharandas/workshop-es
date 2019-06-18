Dependencias
---
Docker y Docker Compose:
- https://docs.docker.com/install/
- https://docs.docker.com/compose/install/

NodeJs, Npm
- https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages

Instalación y puesta en funcionamiento
---

- Copia .env.dist a .env
```shell script
cp .env.dist .env
```

- Instala las dependencias
```shell script
npm install
```

- Lanza EventStore y Redis
```shell script
docker-compose up
```

Acciones
---

- Crear un evento desde línea de comandos: 

```shell script
node index.js serve PaqueteReservado '{"nombre": "manuel"}'
```

- Crear eventos de forma aleatoria en línea de comandos:

```shell script
node index.js random
```
