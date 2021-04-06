package main

import (
	route "api-simulator/src/model"
	"fmt"
)

func main() {
	r := route.Route{
		ID:       "1",
		ClientID: "1",
	}

	r.LoadPositions()
	stringJson, _ := r.ExportJsonPositions()
	fmt.Println(stringJson[1])
}
