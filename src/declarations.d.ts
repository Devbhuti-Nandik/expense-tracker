declare module "*.svg" {
  import { ComponentType } from "react";
  const content: ComponentType<Record<string, unknown>>;
  export default content;
}

declare module "*/car_primary";
declare module "*/car_white";
declare module "*/water_primary";
declare module "*/water_white";
declare module "*/petrol_primary";
declare module "*/petrol_white";
declare module "*/movie_primary";
declare module "*/movie_white";
declare module "*/mobile_primary";
declare module "*/mobile_white";
