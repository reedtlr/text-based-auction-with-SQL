var inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "root",
	database: "auction_db",
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	promptAuctionOptions();
});

const promptAuctionOptions = () => {
	return inquirer
		.prompt([
			{
				type: "list",
				name: "auctionoption",
				message:
					"Welcome to Great Bay Auction! Please select how you would like to proceed.",
				choices: ["Post", "Bid", "Exit"],
			},
		])
		.then((answer) => {
			if (answer.auctionoption == "Post") {
				newItem();
			} else if (answer.auctionoption == "Bid") {
				placeBid();
			} else {
				console.log("Thank you for using Great Bay Auctions!");
				connection.end();
			}
		});
};

const newItem = async () => {
	console.log("Inserting a new product...\n");
	const answers = await inquirer.prompt([
		{
			type: "input",
			name: "itemname",
			message: "What item would you like to list?",
		},
		{
			type: "number",
			name: "currentbid",
			message: "What price would you like to start the bidding at?",
		},
	]);
	var query = connection.query(
		"INSERT INTO listings SET ?",
		{
			item: answers.itemname,
			currentbid: answers.currentbid,
		},
		function (err, res) {
			if (err) throw err;
			console.log("Your product is now live! \n");
			// Call updateProduct AFTER the INSERT completes
			promptAuctionOptions();
		}
	);
};

const placeBid = () => {
	const query = connection.query("SELECT * FROM listings", function (err, res) {
		if (err) throw err;
		var itemNames = res.map(item =>
			item.item
		);
		console.log(res);
		console.log(itemNames);
	});
};
