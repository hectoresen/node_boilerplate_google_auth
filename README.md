## Node/Express Boilerplate

- Boilerplate base utilizando Node con Express, dockerizado y usando typescript.
- Este boilerplate utiliza Postgres como base de datos.

## Instalación y uso utilizando docker

Este boilerplate está preparado para copiar directamente el fichero package.json y realizar una instalación limpia dentro del contenedor cuando este se levanta. Posteriormente compilará a través del comando npm run build y ejecutará el servidor desde el resultado de la compilación.

Para iniciar e instalar las depencencias directamente ejecutar el comando:
```bash
docker compose up
```

El servidor se levantará en modo "escucha" con el comando start:dev usando nodemon como dependencia de desarrollo para escuchar todos los cambios ejecutados en código.

### Instalación de dependencias utilizando docker
```bash
docker compose exec app npm install nombreDependencia
```
Esto instalará la dependencia directamente dentro del contenedor.

## Instalación y uso sin utilizar docker

Puedes utilizar este boilerplate sin docker, primero necesitarás instalar las dependencias:
```bash
npm install o npm i
```

Luego podrás levantar el servidor
```bash
# Para levantarlo escuchando cambios
npm run start:dev
```

```bash
# Para levantarlo sin escuchar cambios
npm run start
```

```bash
# Para levantarlo en modo producción, antes deberás crear una build
npm run serve
```

Compilar aplicación:
```bash
npm run build
```

## ORM

Este boilerplate utiliza TypeORM como ORM

Documentación TypeORM [aquí](https://typeorm.io/).

Este proyecto usa migraciones de base de datos.

```bash
# Crear la migración (una vez hechos los cambios en el modelo)
docker compose exec app npm run migration:generate -- migrations/nombreMigracion
# Aplicar migraciones
docker compose exec app npm run migration:run
```

## Autenticación

Este boilerplate viene preparado para autenticar con google. Puedes iniciar sesión directamente con google, creará un usuario en BBDD y devolverá su perfil junto un token de acceso que tendrá que ser incluído en el resto de peticiones a la api.
- https://localhost:3000/auth/google

Además, podrás añadir otros servicios de autenticación utilizando los endpoints /register y /login

