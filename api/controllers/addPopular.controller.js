const Product = require('../../models/product.model')

module.exports.addPopularPoint = async function (req, res) {
    if (req.body.data) {
        let popularPoint = await Product.find({ _id: req.body.data }).select("popularPoint");
        console.log(popularPoint[0].popularPoint);
        await Product.findOneAndUpdate(
            { _id: req.body.data },
            { $set: { popularPoint: popularPoint[0].popularPoint + 1 } },
            { new: false, passRawResult: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Popular point updated successfully" });
            })
    } else {
        return res.status(400).json({ success: false, msg: 'Product id required' });
    }
}