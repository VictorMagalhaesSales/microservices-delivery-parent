
# ui-delivery-react
Microservice frontend que consome a aplicação feita em NestJS para as suas devidas operações.

## Bibliotecas utilizadas
- **socket.io-client**: integração com WebSockets.
    - Em **[Mapping.tsx](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/ui-delivery-react/src/components/Mapping.tsx)**, a aplicação se conecta com o backend em NestJS através de websocket para trocar as informações das rotas em `new-position` e iniciar uma corrida em `new-direction`.

## Rodando a aplicação:
```bash
npm start
# or
docker-compose up
```
