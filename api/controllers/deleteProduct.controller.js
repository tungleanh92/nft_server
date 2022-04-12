const Product = require('../../models/product.model')
var mongodb = require('mongodb');

module.exports.deleteProduct = async function (req, res) {
    if (req.body.data) {
        console.log(req.body.data);
        await Product.deleteOne({ _id: new mongodb.ObjectID(req.body.data) },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Product deleted successfully!" });
            }
        );
    } else {
        return res.status(400).json({ success: false, msg: "Id required!" });
    }
}