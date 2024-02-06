import { getNotExistIdsFromEntities } from '@knighthell-boilerplate-nestjs/common/utils/get-not-exist-ids-from-entities';

export function checkNotExistIdsFromEntitiesOrFail<Entity>(
  ids: string[],
  entities: Entity[],
  entityIdPropertyName: string,
  failHandler?: (notExistIds: string[]) => void,
): string[] {
  const diffIds = getNotExistIdsFromEntities(
    ids,
    entities,
    entityIdPropertyName,
  );

  if (diffIds.length === 0) {
    return [];
  }

  if (failHandler) {
    failHandler(diffIds);
  }

  return diffIds;
}
