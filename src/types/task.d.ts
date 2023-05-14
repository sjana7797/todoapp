import { type Operation } from "fast-json-patch";

export interface TaskUpdatePatch {
  patch: Operation[];
}
