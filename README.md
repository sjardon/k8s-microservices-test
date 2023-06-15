# K8S Microservices practices

```bash
docker build -t candlesticks-db ./infrastructure/candlesticks-db

docker run --name candlesticks-db-container --env-file ./backend/candlesticks/.env -p 5432:5432 candlesticks-db
```
