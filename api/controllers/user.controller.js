const User = require('../../models/user.model')

module.exports.updateUser = async function (req, res) {
    console.log(req.files);
    if (req.files && req.files.avatar) {
        await req.files.avatar.mv('./uploads/' + req.files?.avatar.name);
        await User.findOneAndUpdate(
            { _id: req.body?._id },
            { $set: { avatar: req.files?.avatar?.name } },
            { new: false, upsert: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "User updated successfully" });
            })
    }
    if (req.files && req.files.banner) {
        await req.files.banner.mv('./uploads/' + req.files?.banner.name);
        await User.findOneAndUpdate(
            { _id: req.body?._id },
            { $set: { banner: req.files?.banner?.name } },
            { new: false, upsert: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "User updated successfully" });
            })
    }
    if (!req.files) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        await User.findOneAndUpdate(
            { _id: req.body?._id },
            {
                // _id: req.body?._id,
                name: req.body?.name,
                url: req.body?.url,
                email: req.body?.email,
                bio: req.body?.bio,
                facebook: req.body?.facebook,
                twitter: req.body?.twitter,
                instagram: req.body?.instagram,
            },
            { new: false, upsert: true },
            (err) => {
                if (err) {
                    return res.status(err.status || 500).json({
                        message: err.message,
                        error: err
                    });
                }
                return res.status(200).json({ success: true, msg: "User updated successfully" });
            })
    }
}

module.exports.getUser = async function (req, res) {
    let { id } = req.query;
    if (id !== null) {
        let docs = await User.findById(id).exec()
        return res.status(200).json({ success: true, data: docs });
    } else {
        return res.status(400).json({ success: false, msg: "docsPerPage and skipDocs required!" });
    }
}