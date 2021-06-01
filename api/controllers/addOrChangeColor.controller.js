const Color = require('../../models/color.model')

module.exports.addOrChangeColor = async function (req, res) {
    if (req.body.id) {
        let updateColor = {
            name: req.body.name,
        }
        await Color.findOneAndUpdate(
            { _id: req.body.id },
            { $set: updateColor },
            { new: false, passRawResult: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Color updated successfully" });
            })
    } else {
        let newColor = new Color({
            name: req.body.name
        });
        newColor.save(function (err) {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
            res.status(200).json({ success: true, msg: 'Color updated successfully' });
        });
    }
}