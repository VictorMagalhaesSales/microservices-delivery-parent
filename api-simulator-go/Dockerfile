FROM golang:1.16

WORKDIR /go/src
COPY . .
ENV PATH="/go/bin:${PATH}"

RUN GOOS=linux go build main.go

RUN apt-get update && \
    apt-get install build-essential librdkafka-dev -y

EXPOSE 8000

CMD ["./main"]