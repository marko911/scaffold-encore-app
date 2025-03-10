# STEPS

1. Run `sqlc generate` to generate the typesafe models and structs from the SQL queries.

```bash
sqlc generate
```

2. Run `encore run` to start the server and run the migrations automatically. (must be of the format
   '[123]\_[description].[up|down].sql)

```bash
encore run
```
