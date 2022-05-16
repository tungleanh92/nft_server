const Customer = require('../../models/customer.model')

module.exports.getCustomer = async function (req, res) {
    let { docsPerPage, skipDocs } = req.body.data;
    if (docsPerPage !== null && skipDocs !== null) {
        let docs = await Customer.find({ delivered: false }).skip(skipDocs).limit(docsPerPage, (err) => {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
        })
        return res.status(200).json({ success: true, data: docs });
    } else {
        return res.status(400).json({ success: false, msg: "docsPerPage and skipDocs required!" });
    }
}