package kafka

import (
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka",
	"os"
)

// KafkaConsumer holds all consumer logic and settings of Apache Kafka connections/
// Also has a Message channel which is a channel where the messages are going to be pushed
type KafkaConsumer struct {
	MsgChan chan *ckafka.Message
}

// NewKafkaConsumer creates a new KafkaConsumer struct with its message channel as dependency
func NewKafkaConsumer(msgChan chan *ckafka.Message) *KafkaConsumer {
	return &KafkaConsumer{
		MsgChan: msgChan,
	}
}

func (k *KafkaConsumer) Consume() {
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": os.Getenv("KafkaBootstrapServers"),
		"group.id":          os.Getenv("KafkaConsumerGroupId"),
	}

	consumer, err := ckafka.NewConsumer(configMap)
	if err != nil {
		log.Fatalf("error consuming kafka message:" + err.Error())
	}

	topics := []string{os.Getenv("KafkaReadTopic")}
	consumer.SubscribeTopics(topics, nil)
	fmt.Println("Kafka consumer has been started")
	
	for {
		msg, err = consumer.ReadMessage(-1)
		if err == nil {
			// Joga a mensagem para esse canal que pode ser acessado em outro ponto da aplicação
			k.MsgChan <- msg
		}
	}
}
