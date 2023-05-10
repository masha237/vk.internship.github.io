interface IResponse<T> {
    data: T | null;
    error: string | null;
}

export default IResponse;