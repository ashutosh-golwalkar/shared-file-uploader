module.exports = (app, middleware) => {

    app.get('/api/v1/file-content',
        (req, res) => {

            console.log(req.query);
            return res.status(200).json({
                status: 200,
                data: {
                    "projectCode": "Project253020",
                    "forecastedCompletionDate": "2019-12-02T22:37:30.721+1100",
                    "plannedCompletionDate": "2019-02-07T13:21:47.809+1100",
                    "completionDate": "",
                    "status": "In Progress"
                }
            });
        });
}
