export interface HttpResponse {
  statusCode: number
  body: any | boolean
}

export interface HttpRequest {
  body?: any
}
