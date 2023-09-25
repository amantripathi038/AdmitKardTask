const formidable = require('formidable');
const textAnalyzer = require('./../utils/textAnalyzer');
const SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB

module.exports.analyzeText = async (req, res, next) => {
    const text = req.body.text;
    const results = textAnalyzer.analyzeText(text);

    res.status(201).json({
        status: 'success',
        message: 'Text analyzed successfully',
        result: results
    })
}

module.exports.uploadFile = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    let flag = false;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error processing form data.' });
        }
        if (!(files.documents)) {
            return res.status(404).json({ error: 'Please upload file.' });
        }
        files.documents.forEach(file => {
            if (flag) return;
            if (file.size > SIZE_LIMIT) {
                res.status(404).json({ error: 'File size is too big.' });
                flag = true;
                return;
            }
        });
        if (flag) return;
        const filepaths = files.documents.map(doc => doc.filepath);
        const results = await Promise.all(filepaths.map(async (path) => {
            return await textAnalyzer.processFile(path);
        }));

        res.status(201).json({
            status: 'success',
            message: 'File uploaded successfully',
            result: results
        })
    });
}