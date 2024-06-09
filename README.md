# API

## todo
- create user
- input validation (zod ?)
- ouput format
- login
- logout
- session / JWT
- password hash 

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