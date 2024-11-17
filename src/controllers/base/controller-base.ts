import { Request, Response, NextFunction } from "express";
import ServiceBase from "../../application/services/base/service-base";
import ModelBase from "../../domain/model/base/model-base";

export default abstract class ControllerBase<TModel extends ModelBase> {
  constructor(protected readonly service: ServiceBase<TModel>) {}

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll();
      return response.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    try {
      const data = await this.service.getById(id);
      return response.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const model = request.body as TModel;
    try {
      const data = await this.service.create(model);
      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const model = request.body as Partial<TModel>;
    try {
      const data = await this.service.update(id, model);
      return response.json(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    try {
      await this.service.delete(id);
      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
