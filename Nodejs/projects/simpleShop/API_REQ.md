# Simple Shop

## Users

```
GET:
/users : Set All Users
/users/:id: Get One User

POST

/users : Add new User

PUT
/users/:id :  Update user
```

## Auth

```
POST: 
/auth/login
/auth/signup
/auth/google
/auth/github
```

## Products

```
GET
/products: Get All Products {search, filter, pagination, ....}
/products/:id : Get One Product Details

POST:
/products/add

PUT:
/products/:id

DELETE
/products/:id
```

## Categories

```
GET:
/categories -> Get all categories

PUT:
/categories/:id -> Update

POST
/categories -> Add new

Delete
/categories/:id 
```

## Product Images

```
GET:

/images/:product_id  -> Get image of a product

PUT

/images/:id -> Update one image
/images/:product_id -> Update all image of a product

POST

/images -> Upload an image
/images/bulk -> Upload image for one product

DELETE

/images/:product_id -> Delete all image of a product
/images/:id -> delete one image
```

## Cart

```

```

## Orders

## Order items

## Payments

## PReviews

## Addresses