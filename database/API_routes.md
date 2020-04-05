# SDC_CRUD_v2
v2 for SDC project

### POST

`/api/houses/{ houseId }`

**Purpose**: create a new home

______________________________________________________
### GET

`/api/houses/{ houseId }`

**Purpose**: Get all the information on a house

**Response**: JSON object containing a house's information
```json
{
    "neighborhood": "VARCHAR",
    "houseId": "uuid",
    "transit_score": "INT",
    "walk_score": "INT",
    "value_inc_dec_past": "INT",
    "value_inc_dec_future": "INT",
    "median_value": "INT",
    "home_cost": "INT",
    "bedrooms": "INT",
    "bathrooms": "INT",
    "home_address": "VARCHAR",
    "sf": "INT",
    "home_image": "VARCHAR"
}
```


`/api/houses?neighborhood={neighborhood name}`

**Purpose**: Retrieving all houses in the neighborhood

**Data Params**

`{ name: <neightborhood name> }`

**Response**: JSON object containing an array of homes in the neighborhood.
```json
{
    "neighborhood": "VARCHAR",
    "houseId": "uuid",
    "transit_score": "INT",
    "walk_score": "INT",
    "value_inc_dec_past": "INT",
    "value_inc_dec_future": "INT",
    "median_value": "INT",
    "home_cost": "INT",
    "bedrooms": "INT",
    "bathrooms": "INT",
    "home_address": "VARCHAR",
    "sf": "INT",
    "home_image": "VARCHAR"
}
```


`/api/neighborhoods`

**Purpose**: Retriving the neighborhood information.

**Data Params**

`{ name: <neighborhood name> }`

**Response**: information on the neighborhood.

```json
{
    "neighborhood": "VARCHAR",
    "houseId": "uuid",
    "transit_score": "INT",
    "walk_score": "INT",
    "value_inc_dec_past": "INT",
    "value_inc_dec_future": "INT",
    "median_value": "INT",
    "home_cost": "INT",
    "bedrooms": "INT",
    "bathrooms": "INT",
    "home_address": "VARCHAR",
    "sf": "INT",
    "home_image": "VARCHAR"
}
```
______________________________________________________
### PATCH

`/api/houses/{ houseId }`

**Purpose**: Update info on house.

**Data Params**

`{ houseId: int }`
______________________________________________________
### DELETE

`/api/houses/{ houseId }`

**Purpose**: Removing a house.

**Data Params**

`{ houseId: int }`
