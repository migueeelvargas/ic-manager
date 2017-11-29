
// app/routes/routes.js
module.exports = function(app, express, conn) {

	// HOME PAGE
	app.get("/", function(req, res) {
		res.render("index.ejs");
	});

	// INVENTORY
	app.get("/inventory", function(req, res, next) {

		// sql query to retrieve all products
		var getDataQuery = "SELECT * FROM products";

		conn.query(getDataQuery, function(err, result) {
			if (err) return next(err);

			var data = JSON.stringify(result);
			// console.log("Data: " + data);

			res.render("inventory.ejs", {
				data: result
			});
		});
	});

	app.post("/inventory", function(req, res) {
		var sku = req.body.sku;
		var product_name = req.body.product_name;
		var category = req.body.category;
		var cost = req.body.cost;
		var price = req.body.price;
		var stock_quantity = req.body.stock_quantity;
		var reorder_quantity = req.body.reorder_quantity;

		var addItemQuery = "INSERT INTO products " + 
		"(sku, product_name, category, cost, price, stock_quantity, reorder_quantity) " +
		"VALUES (" + sku + ", '" + product_name + "', '"
		+ category + "', " + cost + ", " + price + ", "
		+ stock_quantity + ", " + reorder_quantity + ")"

		console.log(addItemQuery);

		conn.query(addItemQuery, function(err, result) {
			if (err) throw err;
			console.log("New item added.");
		});

		res.redirect("/inventory");
	});

}