/**
 * Controllers Common functions
 */
class controllerCommon {
    findSuccess(response) {
        return (result) => response.status(200).json(result);
    }

    serverError(response) {
        return (error) => {
            console.log(error);
            response.status(500).json(error);
        };
    }

    findError(response) {
        return (error) => {
            console.log(error);
            response.status(404).json(error);
        };
    }

    editSuccess(response) {
        return () => response.status(201).json({ message: 'Done' });
    }

    unauthorizedError(response) {
        return () => response.status(401).json({ message: 'Unauthorized' });
    }

    forbbidenError(response) {
        return () => response.status(403).json({ message: 'Forbbiden' });
    }

    customSuccess(response, content) {
        return () => response.status(200).json(content);
    }
}

module.exports = controllerCommon;
