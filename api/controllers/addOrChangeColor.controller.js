const Color = require('../../models/color.model')

module.exports.addOrChangeColor = async function (req, res) {
    let data = req.body.data
    if (data.id) {
        let updateColor = {
            name: data.name,
        }
        await Color.findOneAndUpdate(
            { _id: data.id },
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
            name: data.name
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