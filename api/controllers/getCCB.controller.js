const Brand = require('../../models/brand.model')
const Category = require('../../models/category.model')
const Color = require('../../models/color.model')

module.exports.getCCB = async function (req, res) {
    let brands = await Brand.find();
    let categories = await Category.find();
    let colors = await Color.find(
        (err) => {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
        }
    );
    return res.status(200).json({ success: true, data: { brands, categories, colors } })
}