# microservice-delivery-parent
Parent de microserviços feitos em Go, NextJS/React e NestJS. Tecnologias usadas: Docker, Apache Kafka, gRPC, ElasticSearch, Kibana, Kubernetes, Istio, Kiali, Prometheus e Grafana.



## Apache Kafka
- Utilizamos o projeto **control-center** para visualizar e degerenciar as ferramentas do Kafka.
- Existem 2 tópicos no fluxo da aplicação:
    - route.new-direction: recebe a notificação de direção de uma nova corrida.
    - route.new_position: recebe a notificação das posições em tempo real.

## Kafka Connect
- Trabalharemos com um **connector** do tipo **sync** para inserir os dados no banco de dados **Elasticsearch**.
- Propriedades e configurações para a criação do connector Elasticsearch em [elasticsearch.properties](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/tree/master/apache-kafka/elasticsearch.properties).
- No Kibana foi criado um **index pattern** para juntar os índex criados a partir dos 2 topicos do kafka(route.new_direction e route.new_position).