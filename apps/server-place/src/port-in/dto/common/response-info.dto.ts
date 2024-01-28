import { ResponseInfo } from '@knighthell-boilerplate-idl-proto/place/nestjs/response-info';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ResponseInfoDto implements ResponseInfo {
  /** 총 개수 */
  @ApiResponseProperty({ type: Number, example: 100 })
  totalCount: number;

  /** 결과물의 개수 */
  @ApiResponseProperty({ type: Number, example: 10 })
  resultCount: number;

  /** 요청시 전달된 페이지 수 */
  @ApiResponseProperty({ type: Number, example: 1 })
  requestedPageNumber?: number | undefined;

  /** 요청시 전달된 결과물 제한 수 */
  @ApiResponseProperty({ type: Number, example: 10 })
  requestedLimitNumber?: number | undefined;

  /** 요청시 전달된 커서 Id 값 */
  @ApiResponseProperty({
    type: String,
    example: '0189f7ea-ae2f-72b9-9be8-9c3d224082ef',
  })
  requestedCursorId?: string | undefined;
}
