export const expressRouterAdapter = (controller) => async (req, res) => {
    const htttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId,
    };
    const httpResponse = await controller.handle(htttpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    else {
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body?.message,
        });
    }
};
//# sourceMappingURL=express-router-adapter.js.map