module.exports = function (server) {
    server.get('/api/orders', function (req, res) {
        let sql = "SELECT o.id, t.name, t.price, a.id, a.name FROM order_details as od LEFT JOIN orders as o ON o.id = od.order_id LEFT JOIN tours as t ON t.id = od.product_id JOIN account as a ON a.id = o.account_id"
        conn.query(sql, function (err, data) {
            if (err) return res.send(err);
            if (data.length > 0) {
                res.send({
                    result: data,
                    status: 200
                })
            } else {
                res.send({
                    message: 'Không tìm thấy'
                })
            }
        })
    })

    server.get('/api/orders/:id', function (req, res) {
        var id = req.params.id;
        let sql = "SELECT o.id, t.name, t.price, a.id, a.name FROM order_details as od LEFT JOIN orders as o ON o.id = od.order_id LEFT JOIN tours as t ON t.id = od.product_id JOIN account as a ON a.id = o.account_id WHERE o.id = ?"
        conn.query(sql, [id], function (err, data) {
            if (err) return res.send(err);
            if (data.length > 0) {
                res.send({
                    result: data,
                    status: 200
                })
            } else {
                res.send({
                    message: 'Không tìm thấy'
                })
            }
        })
    })

    server.post('/api/new-orders', (req, res) => {
        console.log(req.body);
        const order = {
            account_id: req.body.account_id
        }
        conn.query("INSERT INTO orders SET ?", order, (err, result) => {
            if (err) {
                res.json(err);
            }
            if (result) {
                // console.log(req.body.carts);
                console.log(result);
                req.body.carts.map((items) => {
                    console.log("map items", items);
                    const details = {
                        order_id: result.insertId,
                        product_id: items.id,
                        quantity: items.quantity,
                        price: items.sale_price > 0 ? items.sale_price * items.quantity : items.price * items.quantity
                    }
                    console.log(details);
                    conn.query("INSERT INTO order_details SET ?", [details], (err2, result2) => {
                        if (err2) {
                            console.log(err2);
                        }
                        if (result2) {
                            console.log(result2);
                        }
                    })
                })
                res.json("Đặt hàng thành công")
            }
        })
    })
}