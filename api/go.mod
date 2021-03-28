module github.com/api

go 1.14

replace github.com/twitter => ./twitter

replace github.com/structs => ./structs

require (
	github.com/gorilla/mux v1.8.0
	github.com/rs/cors v1.7.0
)
