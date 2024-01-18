import { AuthenticationType } from '@knighthell-boilerplate-nestjs/common/guards/authentication.decorator';
import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

export const firebaseAuthGuardHttpHandler = async (
  context: ExecutionContext,
  authenticationType: AuthenticationType,
) => {
  const request: Request = context.switchToHttp().getRequest();
  const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const firebaseIdToken = request.headers.has('authorization')
    ? jwtFromRequest(request)
    : null;

  const decodedIdToken: DecodedIdToken = !!firebaseIdToken
    ? await getAuth().verifyIdToken(firebaseIdToken)
    : null;

  if (!!decodedIdToken) {
    request['user'] = decodedIdToken;
  }

  /**
   * 통과할 수 있는 조건들만 case로 나열. 해당 조건에 맞지 않으면 HTTP UNAUTHORIZED 에러 반환.
   * 막히는 조건들을 case로 나열하고 기본적으로 통과를 시킬수도 있으나,
   * 이는 막히는 막히는 조건들을 실수없이 나열하지않으면 통과되는 문제가 있어 보안상 위험하므로 통과 조건 나열방식으로 설정.
   */
  switch (true) {
    case !firebaseIdToken && authenticationType === AuthenticationType.PRIVATE:
      return true;
    case authenticationType === AuthenticationType.PUBLIC:
      return true;
    default:
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
};
