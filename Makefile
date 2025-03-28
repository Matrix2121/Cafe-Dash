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

logs:
	docker logs -f cafe-dash_backend_1
	@echo Logs comming from the spring boot

up_sql:
	@echo Start database
	docker exec -it cafe-dash_db_1 psql -U postgres -d cafe
