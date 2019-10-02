var mysql = require("mysql");
var inquire = require('inquirer')

var connectme = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shinkansen1001",
    database: "bomaonzin"
});

connectme.connect(function (err) {
    if (err) throw err;
    // console.log(connectme.threadId);
})

function Product(id, what, dpt, price, qty) {
    this.id = id;
    this.what = what;
    this.dpt = dpt;
    this.price = price;
    this.qty = qty;
}

var q3 = [
    {
        name: "action",
        type: "list",
        message: "Select the action you wish to take:",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
    },
]

var q4 = [
    {
        name: "what",
        type: "input",
        message: "Item:"
    },
    {
        name: "department",
        type: "input",
        message: "Department:"
    },
    {
        name: "price",
        type: "number",
        message: "Price:"
    },
    {
        name: "qty",
        type: "number",
        message: "Quantity"
    }
    // {
    //     name: "Quit",
    //     type: 
    // }
]

var q5 = [
    {
        name: "index",
        type: "number",
        message: "index:"
    },
    {
        name: "qty",
        type: "number",
        message: "Quantity to add:"
    }
]

function menu() {
    inquire.prompt(q3).then(answer => {
        var w = answer.action;
        if (w === "View products for sale") {
            var e = "SELECT * FROM products";
            read(e);
        }
        else if (w === "View low inventory") {
            var e = "SELECT * FROM products WHERE qty < 10";
            read(e);
        }
        else if (w === "Add to inventory") {
            inventory();
        }
        else if (w === "Add new product") {
            addprod();
        }
        else {
            connectme.end();
        }
    });
};

function read(r) {
    console.log()
    connectme.query(
        r, function (err, res) {
            if (err) throw err;
            var e = [];
            for (var q = 0; q < res.length; q++) {
                var w = res[q]
                var thing = new Product(w.id, w.what, w.dpt, w.price, w.qty);
                e.push(thing);
            }
            console.table(e)
            menu();
        }
    )
}

function inventory() {
    var e = [];
    var d = [];
    connectme.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var q = 0; q < res.length; q++) {
                var w = res[q]
                var thing = new Product(w.id, w.what, w.dpt, w.price, w.qty);
                e.push(thing);
            }
        },
        inquire.prompt(q5).then(answer => {
            var p = answer.index;
            var s = answer.qty;
            for (var a = 0; a < e.length; a++) {
                if (p === e[a].id) {
                    e[a].qty = e[a].qty + s;
                    d.push(e[a]);
                }
            }
            console.log(d[0].id),
                connectme.query(
                    "UPDATE products SET ? WHERE ?", [
                    {
                        qty: d[0].qty
                    },
                    {
                        id: d[0].id
                    }
                ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows)
                    },
                    console.table(d)
                ),
                menu()
        })
    );
};

function addprod() {
    inquire.prompt(q4).then(answer => {
        console.log(answer.what)
        var t = answer.what;
        var y = answer.department;
        var u = answer.price;
        var i = answer.qty;
        connectme.query(
            "INSERT INTO products SET ?",
            {
                what: t,
                dpt: y,
                price: u,
                qty: i
            },
            function (err, res) {
                if (err) throw err;
                console.log(res)
                var thing = new Product("-", answer.what, answer.department, answer.price, answer.qty)
                console.table(thing);
            }
        );
        menu();
    });
};

menu();