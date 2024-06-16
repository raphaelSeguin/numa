# API

## Required
- .env file with:
  - POSTGRES_PASSSWORD
  - DATABASE_URL
  - JWT_SECRET
  - JWT_ISSUER
  - JWT_AUDIENCE
  - JWT_EXPIRATION_TIME
- docker compose up

## todo
- create user
- input validation (zod ?)
- ouput format
- login OK~
- logout
- session / JWT
- password hash OK

? mettre les tests à côté des fichiers avec des .spec.ts


roles
classes entités
use-cases


# Prisma query builder

paramètres de query strings à prendre en compte
- limit
- offset
- columns
- filter
- search
- sort

Prendre en compte la structure de la table à requêter...
- les colonnes qu'on peut ajouter dans le select... (ou dans le include)
- 



## limit
=> take

## offset
=> skip

## columns
=> select

## filter
=> where clause 
{
  where: {
    AND: [
      created: {
        gte: someDate
      },
      price: {
        lte: 10000
      },
      OR: [
        ...search
      ]
    ]
  }
}

## search
=> inside where clause
OR: [
  { 
    name: {
      contains: 'Ali',
    }
  },
  { 
    name: {
      contains: 'Bernadette',
    }
  },
  {
    favoriteAnimal: {
      in: ['Snail', 'Frog']
    },
  }
]

## sort
orderBy: {
  updatedAt: {
    sort: 'asc',
    nulls: 'last'
  }
}
```
/*
                                                                     +----------------+                                                                          
                                                                     |                |                                                                          
                                                                     |                |                                                                          
                                                                     |      types     |                                                                          
                                                                     |                |                                                                          
                                                                     +--------^-------+                                                                          
                                                                              |                                                                                  
                                                                              |                                                                                  
                                                             +----------------+----------------+                                                                 
                                                             |                                 |                                                                 
                                                             |                                 |                                                                 
                                                             |                                 |                                                                 
                                                             |                                 |                                                                 
                                             +-------------->|             models              |<--------------------+                                           
                                             |               |                                 |                     |                                           
                                             |               |                                 |                     |                                           
                                             |               |                                 |                     |                                           
                                             |               |                                 |                     |                                           
                                             |               +-----------------^---------------+                     |                                           
                                             |                                 |                                     |                                           
                                             |                                 |                                     |                                           
                                             |                                 |                                     |                                           
                                             |                                 |                                     |                                           
                              +--------------+--------+      +-----------------+---------------+        +------------+----------+            >------------------+
                              |                       |      |                                 |        |                       |            |                  |
+--------------+              |                       |      |                                 |        |                       |            |                  |
|              |              |                       |      |                                 |        |                       |            |                  |
|   client     +------------> |    controllers        +------>>            use-cases           <<-------+        repositories   +------------+     database     |
|              |              |                       |      |                                 |        |                       |            |                  |
+--------------+              |                       |      |                                 |        |                       |            |                  |
                              |                       |      |                                 |        |                       |            |                  |
                              |                       |      |                                 |        |                       |            |                  |
                              +-----------------------+      +---------------------------------+        +-----------------------+            +------------------+
 */
```



