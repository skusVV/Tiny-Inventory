# Tini inventory

## Vision
1. There are many stores.
2. Each store has multiple products
3. I don't expect the same product belong to multiple stores.
4. Each product has many category


## Decisions
### Nest
it's well structured, OOP oriented and has a lot of built in features.

### Postgres 
At the moment, there is no complex relations. But eveloving of Tiny store most likely will create more relations.
For example:
- Store may have multiple locations, and I need to keep which product in which location.
- Product may have more attributes: like labels "Soy Free", "Sugar free" etc.
- Product may have expiration time - especially food, it may be crucial for some inventories.
- Sales

As soon as more features will come up, this realtions may grow drastically.

PS. But, for the application in current state - NoSql is also good choice.