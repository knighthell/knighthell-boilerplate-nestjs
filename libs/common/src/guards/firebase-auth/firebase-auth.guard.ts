import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {
  AuthenticationType,
  IS_AUTHENTICATION_DECORATOR_KEY,
} from '@knighthell-boilerplate-nestjs/common/guards/authentication.decorator';
import { firebaseAuthGuardHttpHandler } from '@knighthell-boilerplate-nestjs/common/guards/firebase-auth/firebase-auth-guard-http.handler';
import { firebaseAuthGuardGrpcHandler } from '@knighthell-boilerplate-nestjs/common/guards/firebase-auth/firebase-auth-guard-grpc.handler';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authenticationType =
      this.reflector.getAllAndOverride<AuthenticationType>(
        IS_AUTHENTICATION_DECORATOR_KEY,
        [context.getHandler(), context.getClass()],
      );

    switch (context.getType()) {
      case 'http':
        return firebaseAuthGuardHttpHandler(context, authenticationType);
      case 'rpc':
        return firebaseAuthGuardGrpcHandler(context, authenticationType);
    }

    return false;
  }
}
