# Routes NestJS API
Microservice feito em NestJS.

## Bibliotecas
- **@nestjs/microservices** e **kafkajs**: permite a comunicação com microsservices e a utilização do kafka.
- **@nestjs/websockets**: habilita a comunicação através de WebSockets.

## Apache Kafka
- **Conexão** com kafka feita em **[main.ts](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-routes-nestjs/src/main.ts)** e habilitada no módulo principal da aplicação em **[app.module.ts](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-routes-nestjs/src/app.module.ts)**.
- Ao acessar o endpoint **/routes/${id}/start**, em **[routes.controler.ts](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-routes-nestjs/src/controllers/routes.controller.ts)** é produzida uma mensagem no tópico `route.new-direction` passando o id da rota.
- Ainda em **[routes.controler.ts](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-routes-nestjs/src/controllers/routes.controller.ts)**, é consumido o tópico `route.new-position`, recebendo os valores das rotas vindas do **microservice Go**.

## WebSocket
- Ao receber as rotas do kafka, as mesmas são enviadas para o React através de websocket em **[routes.gateway.ts](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-routes-nestjs/src/websocket/routes.gateway.ts)**.


## Rodando a aplicação
```bash
# Install dependencies
$ npm install

# Run as development and watch mode
$ npm run start:dev
# Run as production mode
$ npm run start:prod
```
