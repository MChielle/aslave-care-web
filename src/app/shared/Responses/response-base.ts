export class ResponseBase<TModel> {
    isSuccess: boolean;
    data: TModel;
}