const formidable = require('formidable');
const textAnalyzer = require('./../utils/textAnalyzer');

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
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error processing form data.' });
        }
        if (!(files.documents)) {
            return res.status(404).json({ error: 'Please upload file.' });
        }
        const filepaths = files.documents.map(doc => doc.filepath);
        const filenames = files.documents.map(doc => doc.originalFilename);
        console.log("here");
        const results = await Promise.all(filepaths.map(async (path) => {
            console.log(path);
            return await textAnalyzer.processFile(path);
        }));

        res.status(201).json({
            status: 'success',
            message: 'File uploaded successfully',
            result: results
        })
    });
}