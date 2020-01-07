# Bamazon
Using the command line, you can purchase goods from "bamazon", a mock version of a web goods store with a similar name.

## Usage
To start, run
```
node connoct
```
The table displays two separate values for each item. Type the **index** of the item you wish to 'purchase' and it will ask to confirm. You will notice that the ```qty``` is reduced by the amount you typed in.

### Exceptions
* Typing in an index value that is not on the list will simply warn you of doing so. The purchase options table is displayed again
* Typing in a quantity greater that the amount in stock will give you the option to simply purchase the rest with the appropriate price for the quantity remaining
* Choosing an item with a quantity of 0 will not allow the purchase

# Bamazon Manager

## Usage
To start, run
```
node bazminaonmagener
```
### Menu
A menu with differect actions will be displayed. In this menu, you can:
* View products for sale
* View low inventory
* Add items to inventory
* Add new products

### Changing Inventory
* Add new product:
Gives options for name, department, price, and quantity

* Add to inventory:
First gives the option to select the ```index``` of the item, and the quantity

## Live Demo
[Youtube](https://youtu.be/rKQF89LQ6Vg)

## Built With
* [dotENV](https://www.npmjs.com/package/dotenv)
* [Express](https://expressjs.com)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* SQLserver
