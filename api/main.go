package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/api/twitter"
	"github.com/gorilla/mux"
	cors "github.com/rs/cors"
)

func main() {

	fmt.Println("api running on port 3000...")

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", twitter.HomeLink)
	router.HandleFunc("/twitter", twitter.Twitter).Methods("GET", "OPTIONS")
	router.HandleFunc("/twitter", twitter.Twitter).Methods("POST", "OPTIONS")
	// router.HandleFunc("/products", inventory.UpdateProduct).Methods("PUT", "OPTIONS")

	c := cors.New(cors.Options{
		AllowedMethods:     []string{"GET", "POST", "PUT", "OPTIONS"},
		AllowedOrigins:     []string{"*"},
		AllowCredentials:   true,
		AllowedHeaders:     []string{"Content-Type", "Bearer", "Bearer ", "content-type", "Origin", "Accept"},
		OptionsPassthrough: true,
	})

	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe("localhost:3000", handler))

}
