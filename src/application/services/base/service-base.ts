import ModelBase from "../../../domain/model/base/model-base";
import RepositoryBase from "../../../Infrastructure/repositorys/base/repository-base";

export default abstract class ServiceBase<TModel extends ModelBase> {
  constructor(protected readonly repository: RepositoryBase<TModel>) {}

  async getAll(): Promise<TModel[]> {
    return await this.repository.getAll();
  }

  async getById(id: string): Promise<TModel> {
    return await this.repository.getById(id);
  }

  async create(model: TModel): Promise<TModel> {
    return await this.repository.create(model);
  }

  async update(id: string, model: Partial<TModel>): Promise<TModel> {
    return await this.repository.update(id, model);
  }

  async delete(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
