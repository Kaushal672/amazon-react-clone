export const responseErrorHandler = (response) => {
    if (!response.ok) {
        throw response;
    }
};
