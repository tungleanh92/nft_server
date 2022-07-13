const Customer = require('../../models/customer.model')

module.exports.setDelivered = async function (req, res) {
    if (req.body.data) {
        await Customer.findOneAndUpdate(
            { _id: req.body.data },
            { $set: { delivered: true } },
            { new: false, passRawResult: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "Order is being delivered" });
            })
    } else {
        return res.status(400).json({ success: false, msg: 'Bill id required' });
    }
}