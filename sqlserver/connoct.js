require('dotenv').config();
var mysql = require("mysql");
var inquire = require('inquirer')

var connectme = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.SQL,
    database: "bomaonzin"
});

connectme.connect(function (err) {
    if (err) throw err;
    console.log(connectme.threadId);
})

console.log("\n\nwelcome to bamzonain")

function Product(id, what, dpt, price, qty) {
    this.id = id;
    this.what = what;
    this.dpt = dpt;
    this.price = price;
    this.qty = qty;
}

var q1 = [
    {
        name: "id",
        type: "number",
        message: "Please enter the index number of the product you wish to purchase, my lord:"
    },
    {
        name: "units",
        type: "number",
        message: "Do enter how much of the item you wish to purchase:",
    }
];

var q2 = [
    {
        name: "yn",
        type: "confirm",
        message: "Yes/no"
    }
]

// function create() {
//     connectme.query(
//         "INSERT INTO music SET ?",
//         {
//             title: "Salem",
//             artist: "Bon Iver",
//             genre: "Alternative"
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows);
//         }
//     )
// };

// function deleteR() {
//     connectme.query(
//         "DELETE FROM music WHERE ?",
//         {
//             artist: "Bon Iver",
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows);
//         }
//     )
// };

function read() {
    connectme.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            var e = [];
            for (var q = 0; q < res.length; q++) {
                w = res[q]
                var thing = new Product(w.id, w.what, w.dpt, w.price, w.qty);
                e.push(thing);
            }
            console.table(e)
            // connectme.end();
            yee(e)
        }
    )
}

function yee(t) {
    var r;
    var y;
    var u = [];
    inquire.prompt(q1).then(answers => {
        if (answers.id > t.length) {
            console.log("\nInvalid index number! Please enter again:\n")
            read();
            return;
        }
        r = t[answers.id];
        y = answers.units;
        u.push(t[answers.id].id);
        u.push(t[answers.id].qty);
        u.push(y);
        u.push(t[answers.id].what)
        u.push(t[answers.id].price * answers.units)
        if (answers.id <= t.length) {
            if (y > r.qty) {
                if (r.qty <= 0) {
                    console.log("\nUnfortunately, we have no idea where this produt is.\nPlease make another selection:");
                    read();
                    return;
                }
                else {
                    console.log("\nQuantity desired greater than stock amount!\nWould you like to purchase the remaining " + r.qty + " of " + r.what + "?");
                    inquire.prompt(q2).then(answer => {
                        if (answer.yn === true) {
                            u[2] = t[answers.id].qty
                            bo(u);
                        }
                        else {
                            console.log("sad")
                            connectme.end();
                        }
                    })
                    return;
                }
            }
            console.log("Would you like to purchase " + y + " " +u[3] + " for $" + u[4] + "?")
            inquire.prompt(q2).then(answer => {
                if (answer.yn === true) {
                    bo(u);
                }
                else {
                    console.log("\nget out\n");
                    connectme.end();
                    return;
                }
            })
        }
        else {
            console.log("\nUnvalid index number! please enter a correct index:\n")
            read();
            return;
        };
    });
};

function bo(i) {
    // console.log(i)
    var o = i[1] - i[2];
    connectme.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                qty: o
            },
            {
                id: i[0]
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows)
        }
    )
    console.log("confirmed, purchased " + i[2] + " of " + i[3] + " for $" + i[4] + "\nWould you like to continue?")
    inquire.prompt(q2).then(answer => {
        if (answer.yn === true) {
            read();
        }
        else {
            console.log("\nget out\n");
            connectme.end();
        }
    })
}

read();