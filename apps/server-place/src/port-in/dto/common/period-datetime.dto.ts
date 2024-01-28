import { PeriodDateTime } from '@knighthell-boilerplate-idl-proto/place/nestjs/period-datetime';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class PeriodDateTimeDto implements PeriodDateTime {
  @ApiProperty({
    type: Date,
    example: '2024-01-01T01:01:01.111Z',
    description: '검색 범위 처음 날짜 및 시간',
  })
  @IsDate()
  @IsNotEmpty()
  from?: Date | undefined;

  @ApiProperty({
    type: Date,
    example: '2024-01-01T01:01:01.111Z',
    description: '검색 범위 마지막 날짜 및 시간',
  })
  @IsDate()
  @IsNotEmpty()
  to?: Date | undefined;
}
