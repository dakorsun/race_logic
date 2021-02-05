import {
  Model, ModelStatic, Sequelize,
} from 'sequelize';

export interface ModelsObject {
  [propName: string]: ModelStatic<Model<any, any>>
}
export interface AssociateModelFn{
  (arg: ModelsObject): void
}

export interface FunctionsObject {
  [propName: string]: AssociateModelFn
}

export interface InitializeModelFn{
  (arg: Sequelize): [ModelStatic<Model<any, any>>, AssociateModelFn]
}
