
@Injectable()
export class CosmosDbRepository<T> implements AzureCosmosRepository<T> {
  // tslint:disable-next-line: no-empty
  constructor(private readonly container: Container) {}
  async filterByIds(ids: Array<string>): Promise<T[]> {
      const querySpec = {
        query: 'SELECT * FROM c WHERE ARRAY_CONTAINS (@ids, c.id)',
        parameters: [
          {
            name: '@ids',
            value: ids,
          },
        ],
      };
      const result = await this.container.items.query<T>(querySpec).fetchAll();
      return result.resources;
    }
