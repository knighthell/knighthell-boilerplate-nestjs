import { HttpStatus } from '@nestjs/common';
import { status as GrpcStatus } from '@grpc/grpc-js';

export class UnsupportedServiceMethodException extends Error {
  httpStatusCode: HttpStatus = HttpStatus.METHOD_NOT_ALLOWED;
  grpcStatusCode: GrpcStatus = GrpcStatus.UNAVAILABLE;
}
