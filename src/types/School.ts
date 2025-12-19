import type { Department } from './Department';

export interface School {
  id: number;
  name: string;
  departments: Department[];
}

