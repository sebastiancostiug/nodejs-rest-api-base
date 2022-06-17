/**
 * Controllers Common functions
 */
class controllerCommon {
    findSuccess(response) {
        return (result) => {
            response.status(200); // Found
            response.json(result);
        };
    }

    existsSuccess(response) {
        return (result) => {
            response.status(200); // Found
            response.json(result);
        };
    }

    editSuccess(response) {
        return () => {
            response.status(201); // Created/Updated/Deleted
            response.json({});
        };
    }

    serverError(response) {
        return (error) => {
            response.status(500);
            response.json(error);
        };
    }

    findError(response) {
        return (error) => {
            response.status(404); // Not found
            response.json(error);
        };
    }
}

module.exports = controllerCommon;
