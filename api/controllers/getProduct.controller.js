const Product = require('../../models/product.model')

module.exports.getProduct = async function (req, res) {
    let { docsPerPage, skipDocs, brand, category, color, price, keyword, sortOption } = req.body.data;
    if (docsPerPage !== null && skipDocs !== null) {
        if (brand && brand.length == 0) brand = null
        if (brand === null && category === null && color === null && price === null && keyword === null && sortOption === null) {
            let countProduct = await Product.count();
            let docs = await Product.find().skip(skipDocs).limit(docsPerPage, (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
            })
            return res.status(200).json({ success: true, data: { totalProducts: countProduct, productList: docs } });
        } else {
            let query = {};
            if (category) { query.category = category }
            if (brand) { query.brand = brand }
            if (color) { query.color = color }
            if (price) { query.price = price }
            if (keyword) { query.name = { '$regex': keyword, '$options': 'i' } }
            sortOption === 'updatedAt' ? sortOption = { 'updatedAt': -1 } : sortOption = { 'popularPoint': -1 }
            let countProduct = await Product.where(query).countDocuments();
            let docs = await Product.find(query).sort(sortOption).skip(skipDocs).limit(docsPerPage, (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
            })
            return res.status(200).json({ success: true, data: { totalProducts: countProduct, productList: docs } });
        }
    } else {
        return res.status(400).json({ success: false, msg: "docsPerPage and skipDocs required!" });
    }
}