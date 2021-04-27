# microservice-delivery-parent

- UI Delivert(**React**) - **[Documentation](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/ui-delivery-react/README.md)**
- API Routes(**NestJS**) - **[Documentation](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/api-routes-nestjs/README.md)**
- API Simulator(**Golang**) - **[Documentation](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/api-simulator-go/README.md)**

![Resumo](https://i.ibb.co/SJNJMz9/sumary.png)

# Comunicação
### Apache Kafka
- Utilizamos o projeto **control-center** para visualizar e gerenciar as ferramentas do Kafka.
- Existem 2 tópicos no fluxo da aplicação:
    - `route.new-direction`: recebe a notificação de um direcionamento para uma nova corrida do **NestJS** e consumido pelo **Go**.
    - `route.new_position`: recebe a notificação das posições em tempo real do microservice **Go**.

### WebSocket
- Os microservices em React e Nestjs se comunicam trafegando as rotas através de WebSocket.

### Kafka Connect
- Trabalharemos com um **connector** do tipo **sync** para inserir os dados no banco de dados **Elasticsearch**.
- Configurações para a criação do connector Elasticsearch em [elasticsearch.properties](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/_kafka/elasticsearch.properties).

### ElasticSearch e Kibana
- O Kafka cria um index para cada tópico criado `route.new_direction` e `route.new_position` no ElasticSearch.
- No kibana, realizamos configurações para criação da **dashboard de monitoramento** da aplicação: **[passo a passo](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/_kafka/README.md)**.
