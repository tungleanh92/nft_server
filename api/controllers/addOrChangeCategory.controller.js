const Category = require('../../models/category.model')

module.exports.addOrChangeCategory = async function (req, res) {
    if (req.body.id) {
        let updateCategory = {
            name: req.body.name,
        }
        await Category.findOneAndUpdate(
            { _id: req.body.id },
            { $set: updateCategory },
            { new: false, passRawResult: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Category updated successfully" });
            })
    } else {
        let newCategory = new Category({
            name: req.body.name
        });
        newCategory.save(function (err) {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
            res.status(200).json({ status: 200, msg: 'Category updated successfully' });
        });
    }
}