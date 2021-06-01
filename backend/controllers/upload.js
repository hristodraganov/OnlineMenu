exports.image_upload_post = (req, res) => {

    if (req.files === null) {
        return res.status(201).json({ msg: 'Please upload a file first.' })
    }

    const file = req.files.file
    file.mv(`./images/${file.name}`, err => {
        if (err) {
            return res.status(201).send(err)
        }
        res.status(201).json({ msg: `Your image ${file.name} was uploaded successfully.` })
    })
}