import { Model, UpdateQuery, Types } from "mongoose";
import HttpError from "../../errors/http-error";
import ModelBase from "../../../domain/model/base/model-base";
import ErrorMessages from "../../errors/error-messages";

export default abstract class RepositoryBase<TModel extends ModelBase> {
  constructor(protected readonly entity: Model<TModel>) {}

  async getAll(): Promise<TModel[]> {
    const data = await this.entity.find();
    return data.map((doc) => doc.toObject() as TModel);
  }

  async getById(id: string): Promise<TModel> {
    if (!Types.ObjectId.isValid(id)) throw new HttpError(ErrorMessages.Validations.INVALID_ID, 400);

    const data = await this.entity.findById(id);
    if (!data) throw new HttpError(ErrorMessages.Validations.DATA_NOT_FOUND, 404);
    return data.toObject() as TModel;
  }

  async create(model: Partial<TModel>): Promise<TModel> {
    const data = await this.entity.create(model);
    return data.toObject() as TModel;
  }

  async update(id: string, model: Partial<TModel>): Promise<TModel> {
    if (!Types.ObjectId.isValid(id)) throw new HttpError(ErrorMessages.Validations.INVALID_ID, 400);

    // Atualiza o parametro updatedAt para receber a data atual
    const updatedModel: Partial<TModel> = { ...model, updatedAt: new Date() };

    const data = await this.entity.findByIdAndUpdate(id, { $set: updatedModel as UpdateQuery<TModel> }, { new: true });
    if (!data) throw new HttpError(ErrorMessages.Validations.DATA_NOT_FOUND, 404);
    return data.toObject() as TModel;
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new HttpError(ErrorMessages.Validations.INVALID_ID, 400);

    const data = await this.entity.findByIdAndDelete(id);
    if (!data) throw new HttpError(ErrorMessages.Validations.DATA_NOT_FOUND, 404);
    return;
  }

  async getByProps(props: Partial<TModel>): Promise<TModel | null> {
    return this.entity.findOne(props);
  }
}
