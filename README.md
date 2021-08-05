# Documentação - API TESTE

Tecnologia Utilizada:

- Typescript
- NodeJS
- Express
- NestJS
- Swagger
- MongoDB
- Docker
- Docker Compose

## Instalação

```bash
# Inicia a aplicação utilizando docker
$ ./start
```

## Iniciar manualmente

```bash
docker-compose down --rmi local
docker-compose up -d --build

#Opcional: caso queira monitorar a aplicação
docker-compose logs -f

```

## Acesso para documentação da API - Swagger

```bash
http://localhost:3333/documentacao/
```

## Contato

- Autor - [Jaquison Ferreira](https://www.linkedin.com/in/jaquison-ferreira-505360205/)
