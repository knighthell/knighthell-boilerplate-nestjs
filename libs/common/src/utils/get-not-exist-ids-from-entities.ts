export function getNotExistIdsFromEntities<Entity>(
  ids: string[],
  entities: Entity[],
  entityIdPropertyName: string,
): string[] {
  const existEntityIds: string[] = entities.map(
    (entity) => entity[entityIdPropertyName],
  );

  const differenceIdsSet = new Set(
    ids.filter((x) => !new Set(existEntityIds).has(x)),
  );

  return Array.from(differenceIdsSet);
}
