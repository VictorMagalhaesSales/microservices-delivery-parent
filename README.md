# microservice-delivery-parent
Parent de microserviços feitos em Go, NextJS/React e NestJS. Tecnologias usadas: Docker, Apache Kafka, ElasticSearch, Kibana, Kubernetes, Istio, Kiali, Prometheus e Grafana.

# Microservices

- UI Delivert(**React**) - **[Documentation](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/ui-delivery-react/README.md)**
- API Routes(**NestJS**) - **[Documentation](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/api-routes-nestjs/README.md)**
- API Simulator(**Golang**) - **[Documentation](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/api-simulator-go/README.md)**

# Comunicação

### Fluxo:

- **React** ==[**WEBSOCKET**:INICIAR_ROTA]==> **NestJS** ==[**KAFKA**:INICIA_ROTA]==> **Golang** ==[**KAFKA**:ENVIA_POSIÇÕES]==> **NestJS** ==[**WEBSOCKET**:ENVIA_POSIÇÕES]==> **React**

### Apache Kafka
- Utilizamos o projeto **control-center** para visualizar e gerenciar as ferramentas do Kafka.
- Existem 2 tópicos no fluxo da aplicação:
    - `route.new-direction`: recebe a notificação de um direcionamento para uma nova corrida do **NestJS** e consumido pelo **Go**.
    - `route.new_position`: recebe a notificação das posições em tempo real do microservice **Go**.

### WebSocket
- Os microservices em React e Nestjs se comunicam trafegando as rotas através de WebSocket.

### Kafka Connect
- Trabalharemos com um **connector** do tipo **sync** para inserir os dados no banco de dados **Elasticsearch**.
- Configurações para a criação do connector Elasticsearch em [elasticsearch.properties](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/apache-kafka/elasticsearch.properties).
- No Kibana foi criado um **index pattern** para juntar os índex criados a partir dos 2 topicos do kafka(route.new_direction e route.new_position).
