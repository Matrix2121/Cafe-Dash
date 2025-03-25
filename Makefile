SHELL=/bin/bash

up:
	docker-compose down
	docker-compose up -d
	@echo Docker containers are up and running

up_build:
	docker-compose up -d --build
	@echo Docker containers are build and running

down:
	docker-compose down
	@echo Docker containers are down



