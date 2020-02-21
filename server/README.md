This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

### api
    
    api
    - api controller
    - api param
        - joi validations
    - api route
    - api model


## database schema

    - product
    - user
    - cart

### Current 
    user & cart one-one
    Links by same id (Possibility of merging them into one collection)
    
    Each cart-item contains price & name
    Gives banifit
    - getting user selected price even if product price changes
    - total doesn't need to be maintained


### Alternative Possibility
    product -> includes cart items with user id
    allowing product to be decouplled
    as user - fetch cart is not that often of a read
    Gives lesser redundancy & product analysis performace benfits.
    

## Testing
    - 15 tests
    - prodcart.spec.js contrains flow test
    - final cart updates needs to be validated
    - improvements in test architecture needed

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
