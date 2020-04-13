# SDC_CRUD_v2
v2 for SDC project

### POST

`/api/houses`

**Purpose**: create a new home

______________________________________________________
### GET

`/api/houses/:neighborhood_id`

**Purpose**: Get 12 houses by neighborhood id

**Response**: JSON object containing an array houses
```json
[
    {
        id: int,
        neighborhood_id: int,
        home_cost: int,
        bedrooms: int,
        bathrooms: int,
        home_address: string,
        sf: int,
        home_image int
    }
]    
```


`/api/neighborhoods/:id`

**Purpose**: Retrieving information by neighborhood id

**Response**: JSON object containing information on a sepcific neighborhood
```json
{
    id: int,
    neighborhood: string,
    transit_score: int,
    walk_score: int,
    value_inc_dec_past: int,
    value_inc_dec_future: int,
    median_value: int
}
```
______________________________________________________
### PATCH

`/api/houses/:id/:home_cost`

**Purpose**: Update house's price.

______________________________________________________
### DELETE

`/api/houses/:id`

**Purpose**: Removing a house.

