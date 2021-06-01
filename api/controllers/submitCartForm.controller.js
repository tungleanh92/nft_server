const Customer = require('../../models/customer.model')
const Product = require('../../models/product.model')

const validateEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validatePhoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
const validateZipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/

module.exports.submitCartForm = async function (req, res) {
    let data = JSON.parse(req.body.data)
    if (!validateZipcodeRegex.test(data.zipcode)) {
        return res.status(400).json({ success: false, msg: 'Zipcode not valid.' });
    }
    if (!validatePhoneRegex.test(data.phoneNo)) {
        return res.status(400).json({ success: false, msg: 'Phone number not valid.' });
    }
    if (!validateEmailRegex.test(data.email)) {
        return res.status(400).json({ success: false, msg: 'Email not valid.' });
    }
    let customer = new Customer({
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        email: data.email,
        country: data.countryName,
        address: data.address,
        town: data.town,
        zipcode: data.zipcode,
        phoneNo: data.phoneNo,
        comment: data.comment,
        optionPayment: data.optionPayment,
        cart: data.cart
    });

    for (let i = 0; i < data.cart.length; i++) {
        let selectedProduct = await Product.find({ _id: data.cart[i].id }).select("quantity")
        let updateQty = selectedProduct[0].quantity - data.cart[i].quantity
        await Product.findOneAndUpdate({ _id: data.cart[i].id }, { $set: { quantity: updateQty } })
    }

    customer.save(function (err) {
        if (err) {
            return res.status(err.status || 500).json({
                message: err.message,
                error: err
            });
        }
        return res.status(200).json({ success: true, msg: 'Update database successfully.' });
    });
}