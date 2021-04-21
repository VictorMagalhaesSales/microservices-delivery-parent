# api-simulator-go
Microservice feito em Golang com o **objetivo de enviar os dados de localização**. 
Possui uma organização de pastas pensadas para um melhor entendimento da arquitetura para revisão de conteúdo. 

## Apache Kafka
- **[producer.go](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-simulator-go/src/modules/kafka/producer.go)**: cria uma função publish que será usada em **[route-service.go](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-simulator-go/src/services/route-service.go)** para publicar os dados das novas rotas;
- **[consumer.go](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-simulator-go/src/modules/kafka/consumer.go)**: cria o consumidor para `route.new-direction` e joga os dados em um canal(`MsgChan`) que é consumido em **[main.go](https://github.com/VictorMagalhaesSales/microservices-delivery-parent/blob/master/api-simulator-go/main.go)**, onde publicará as novas rotas no tópico `route.new-position`;

## Rodando a aplicação
```sh
# Run docker-compose services
docker-compose up -d

# Run go application
go run main.go all
```