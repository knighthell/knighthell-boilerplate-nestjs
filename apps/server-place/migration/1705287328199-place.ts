import { MigrationInterface, QueryRunner } from 'typeorm';

export class Place1705287328199 implements MigrationInterface {
  name = 'Place1705287328199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "PlaceUser" ("id" uuid NOT NULL, "email" character varying(255) NOT NULL, "photoURL" character varying(2048) NOT NULL, "displayName" character varying(255) NOT NULL, CONSTRAINT "PK_01a0aed265a5ef5ca215e28c117" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TABLE "Place"
                                 (
                                     "placeId"         uuid                    NOT NULL DEFAULT uuid_generate_v7(),
                                     "geom"            geography(Point, 4326)  NOT NULL,
                                     "createdAt"       TIMESTAMP               NOT NULL DEFAULT now(),
                                     "updatedAt"       TIMESTAMP               NOT NULL DEFAULT now(),
                                     "deletedAt"       TIMESTAMP,
                                     "name"            character varying(1000) NOT NULL,
                                     "nameTranslation" jsonb,
                                     "address"         jsonb,
                                     CONSTRAINT "PK_d82be71683f14c542aa90345f4b" PRIMARY KEY ("placeId")
                                 );
        COMMENT ON COLUMN "Place"."placeId" IS '장소 고유 Id';
        COMMENT ON COLUMN "Place"."geom" IS '장소의 위치정보를 spacial data column type으로 저장된 데이터';
        COMMENT ON COLUMN "Place"."name" IS '장소 이름';
        COMMENT ON COLUMN "Place"."nameTranslation" IS '장소 이름에 대한 다국어 정보';
        COMMENT ON COLUMN "Place"."address" IS '장소가 포함된 나라의 주소 정보'`);
    await queryRunner.query(
      `CREATE INDEX "IDX_ffdc9289adf4b468bbf757c94a" ON "Place" USING GiST ("geom") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ffdc9289adf4b468bbf757c94a"`,
    );
    await queryRunner.query(`DROP TABLE "Place"`);
    await queryRunner.query(`DROP TABLE "PlaceUser"`);
  }
}
