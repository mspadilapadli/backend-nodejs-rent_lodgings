[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14449488&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

# Rent-Room Documentation (Challenge 1)

## 1. POST /add-user

Request:

-   body:

```json
{
    "username": "padli",
    "email": "padli@gmail.com",
    "password": "12345",
    "phoneNumber": "081234567890",
    "address": "Jakarta Selatan"
}
```

_Response (201 - Created)_

```json
{
    "message": "padli@gmail.com has been created"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Minimum password character is 5",
        "email is required",
        "Invalid email format",
        "password is required"
    ]
}
```

&nbsp;

## 2. POST /login

Request:

-   body:

```json
{
    "email": "admin@gmail.com",
    "password": "12345"
}
```

_Response (200 - OK)_
​

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 3. GET /pub/lodgings

Request:

```json
localhost:3000/pub/lodgings
```

_Response (200 - OK)_
​

```json
[
  {
        "id": 1,
        "name": "Putra Kost",
        "facility": "Kasur, Kipas, Toilet dalam",
        "roomCapacity": 1,
        "imgUrl": "https://infokost.id/wp-content/uploads/2023/03/PXL_20230313_070522622-scaled.jpg",
        "location": "Jakarta Selatan",
        "price": 2000000,
        "typeId": 1,
        "authorId": 1,
        "createdAt": "2024-03-30T05:11:17.122Z",
        "updatedAt": "2024-03-30T05:11:17.122Z"
    },
    {
        "id": 2,
        "name": "Putri Kost",
        "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
        "roomCapacity": 2,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
        "location": "Jakarta Selatan",
        "price": 2800000,
        "typeId": 2,
        "authorId": 1,
        "createdAt": "2024-03-30T05:11:17.122Z",
        "updatedAt": "2024-03-30T05:11:17.122Z"
    },
  ...
]
```

&nbsp;

## 4. GET /pub/lodgings/:id

Request:

```json
localhost:3000/pub/lodgings/10
```

-   params:

```json
{
    "id": "integer"
}
```

_Response (200 - OK)_
​

```json
{
    "id": 10,
    "name": "Batak's Kost",
    "facility": "Kasur Twin bad, AC, Toilet dalam, dapur, rooftop",
    "roomCapacity": 4,
    "imgUrl": "https://www.yogyes.com/id/yogyakarta-hotel/guest-house/pavilo/1.jpg",
    "location": "Jakarta Selatan",
    "price": 3500000,
    "typeId": 3,
    "authorId": 1,
    "createdAt": "2024-03-30T05:11:17.122Z",
    "updatedAt": "2024-03-30T05:11:17.122Z"
}
```

&nbsp;

## 5. POST /lodgings

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   body:

```json
{
    "name": "New Kost Padila",
    "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
    "roomCapacity": 3,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
    "location": "Jakarta Selatan",
    "price": 3800000,
    "typeId": 3
}
```

_Response (201 - Created)_

```json
{
    "message": "new item New Kost Padila created ",
    "rooms": {
        "id": 22,
        "name": "New Kost Padila",
        "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
        "roomCapacity": 3,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
        "location": "Jakarta Selatan",
        "price": 3800000,
        "typeId": 3,
        "authorId": 1,
        "updatedAt": "2024-03-30T08:19:18.421Z",
        "createdAt": "2024-03-30T08:19:18.421Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "name is required",
        "facility is required",
        "imgUrl is required",
        "Please input url format",
        "location is required",
        "Minimum price is 1500000",
        "typeId is required"
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 6. GET /lodgings

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_
​

```json
[
  {
        "id": 1,
        "name": "Putra Kost",
        "facility": "Kasur, Kipas, Toilet dalam",
        "roomCapacity": 1,
        "imgUrl": "https://infokost.id/wp-content/uploads/2023/03/PXL_20230313_070522622-scaled.jpg",
        "location": "Jakarta Selatan",
        "price": 2000000,
        "typeId": 1,
        "authorId": 1,
        "createdAt": "2024-03-30T05:11:17.122Z",
        "updatedAt": "2024-03-30T05:11:17.122Z"
    },
    {
        "id": 2,
        "name": "Putri Kost",
        "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
        "roomCapacity": 2,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
        "location": "Jakarta Selatan",
        "price": 2800000,
        "typeId": 2,
        "authorId": 1,
        "createdAt": "2024-03-30T05:11:17.122Z",
        "updatedAt": "2024-03-30T05:11:17.122Z"
    },
  ...
]
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 7. GET /lodgings/:Id

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

_Response (200 - OK)_
​

```json
{
    "id": 8,
    "name": "Matata Kost",
    "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
    "roomCapacity": 2,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
    "location": "Jakarta Selatan",
    "price": 2800000,
    "typeId": 2,
    "authorId": 1,
    "createdAt": "2024-03-30T05:11:17.122Z",
    "updatedAt": "2024-03-30T05:11:17.122Z"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 8. PUT /lodgings/:id

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

-   body:

```json
{
    "name": "Putra Kost edited",
    "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
    "roomCapacity": 2,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
    "location": "Jakarta Selatan",
    "price": 3700000,
    "typeId": 2,
    "authorId": 2
}
```

_Response (200 - OK)_

```json
{
    "message": "Data with id 1 has been updated",
    "updated": {
        "id": 1,
        "name": "Putra Kost edited",
        "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
        "roomCapacity": 2,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
        "location": "Jakarta Selatan",
        "price": 3700000,
        "typeId": 2,
        "authorId": 2,
        "createdAt": "2024-03-30T05:11:17.122Z",
        "updatedAt": "2024-03-30T08:38:58.582Z"
    }
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "name is required",
        "facility is required",
        "imgUrl is required",
        "Please input url format",
        "location is required",
        "Minimum price is 1500000",
        "typeId is required"
    ]
}
```

_Response (403 - Forbidden)_

des: staff updates data created by others

```json
{
    "message": "`You're not Unauthorized`"
}
```

_Response (401 - Unauthorized)_

des: access without login

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 9. DELETE /lodgings/:id

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "New Kost Bunga success to delete",
    "room": {
        "id": 21,
        "name": "New Kost Bunga",
        "facility": "Kasur Twin bad, AC, Toilet dalam, dapur",
        "roomCapacity": 3,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXBYu21sPbZtg8KgN1b_S3yz5TyeBE86jQ&usqp=CAU",
        "location": "Jakarta Selatan",
        "price": 3800000,
        "typeId": 3,
        "authorId": 1,
        "createdAt": "2024-03-30T08:18:51.802Z",
        "updatedAt": "2024-03-30T08:18:51.802Z"
    }
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (403 - Forbidden)_

des: staff deletes data created by others

```json
{
    "message": "`You're not Unauthorized`"
}
```

_Response (401 - Unauthorized)_

des: access without login

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 10. POST /types

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   body:

```json
{
    "name": "Exclusive"
}
```

_Response (201 - Created)_

```json
{
    "message": "new type Exclusive created ",
    "type": {
        "id": 4,
        "name": "Exclusive",
        "updatedAt": "2024-03-30T08:49:46.861Z",
        "createdAt": "2024-03-30T08:49:46.861Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": ["type is required"]
}
```

&nbsp;

## 11. GET /types

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_
​

```json
[
    {
        "id": 1,
        "name": "Small",
        "createdAt": "2024-03-30T05:11:16.880Z",
        "updatedAt": "2024-03-30T05:11:16.880Z"
    },
    {
        "id": 2,
        "name": "Medium",
        "createdAt": "2024-03-30T05:11:16.880Z",
        "updatedAt": "2024-03-30T05:11:16.880Z"
    },
    {
        "id": 3,
        "name": "Large",
        "createdAt": "2024-03-30T05:11:16.880Z",
        "updatedAt": "2024-03-30T05:11:16.880Z"
    },
    {
        "id": 4,
        "name": "Exclusive",
        "createdAt": "2024-03-30T08:49:46.861Z",
        "updatedAt": "2024-03-30T08:49:46.861Z"
    }
]
```

&nbsp;

## 12. PUT /types/:id

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

-   body:

```json
{
    "name": "Exclusive edited 2"
}
```

_Response (200 - OK)_

```json
{
    "message": "Exclusive edited has been updated ",
    "updated": {
        "id": 4,
        "name": "Exclusive edited 2",
        "createdAt": "2024-03-30T08:49:46.861Z",
        "updatedAt": "2024-03-30T08:59:16.453Z"
    }
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": ["type is required"]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

&nbsp;

## 13. DELETE /types/:id

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "Exclusive edited 2 success to delete "
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 14. PATCH /lodgings/:id/imgUrl

Request:

-   headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

-   file:

```json
{
    "imgUrl": "<image/*>"
}
```

_Response (201 - Created)_

```json
{
    "message": "Image Putra Kost edited has been updated "
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```
