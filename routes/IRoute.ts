interface IRoute {
    path: string;
    httpMethod: string;
    middleware: Function[]
}

export {IRoute};
