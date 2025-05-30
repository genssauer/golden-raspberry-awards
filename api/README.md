# Golden Raspberry Awards API

## Installation

```bash
npm install
```

## Environment Variables

### Antes de rodar o projeto, copie o arquivo .env.example e renomeie para .env:

```bash
cp .env.example .env
```

## Database Migration

### Antes de rodar o projeto, execute as migrations para criar as tabelas do banco de dados:

```bash
npm run knex -- migrate:latest
```

## Development

```bash
npm run start:dev
```

## Access endpoint

http://localhost:3000/producers/intervals

## Production

```bash
npm run build
npm run start
```

## Tests

```bash
npm run test
```
