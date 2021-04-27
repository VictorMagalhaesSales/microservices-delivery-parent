- É necessário criar os indices manualmente para mapear os types corretamente(principalmente geo_point):
```
PUT route.new-direction
{
  "mappings": {
    "properties": {
      "clientId": {
        "type": "text",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "routeId": {
        "type":"text",
        "fields": { 
          "keyword": { "type": "keyword" }
        }
      },
      "timestamp": { "type": "date" }
    }
  }
}
PUT route.new-position 
{
  "mappings": {
    "properties": {
      "clientId": {
        "type": "text",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "routeId": {
        "type":"text",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "timestamp": { "type": "date" },
      "finished": { "type": "boolean" },
      "position": { "type": "geo_point" }
    }
  }
}
```
- Deve-se criar um **index pattern** para cada índex setando o campo timestamp como Time field.
- Depois, criamos as **visualizações** de Corridas(**metric**), Browsers conectados(**metric**), Rota vs Qtd(**datatable**), Gráfico de rotas(**donut**) e um Mapa com as rotas.
- Por último, juntamos as visualizações em um **dashboard**.