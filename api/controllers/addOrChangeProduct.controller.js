const Product = require('../../models/product.model')

module.exports.addOrChangeProduct = async function (req, res) {
    if (req.body.id) {
        let updateProduct = {
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.body.image,
            color: req.body.color,
            views: req.body.views,
            description: req.body.description
        }
        await Product.findOneAndUpdate(
            { _id: req.body.id },
            { $set: updateProduct },
            { new: false, passRawResult: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Products updated successfully" });
            })
    } else {
        let newProduct = new Product({
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            color: req.body.color,
            views: req.body.views,
            image: [],
            description: req.body.description
        });

        for (let i in req.files.image) {
            let image = req.files.image[i];
            newProduct.image.push({ name: image.name });
            image.mv('./uploads/' + image.name);
        }
        newProduct.save(function (err) {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
            res.status(200).json({ success: true, msg: 'Products updated successfully' });
        });
    }
}