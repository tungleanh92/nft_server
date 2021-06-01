const Brand = require('../../models/brand.model')

module.exports.addOrChangeBrand = async function (req, res) {
    if (req.body.id) {
        let updateBrand = {
            name: req.body.name,
        }
        await Brand.findOneAndUpdate(
            { _id: req.body.id },
            { $set: updateBrand },
            { new: false, passRawResult: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Brand updated successfully" });
            })
    } else {
        let newBrand = new Brand({
            name: req.body.name
        });
        newBrand.save(function (err) {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
            res.status(200).json({ success: true, msg: 'Brand updated successfully' });
        });
    }
}