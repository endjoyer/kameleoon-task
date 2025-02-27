export enum TestType {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT',
}

export enum Status {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export interface Site {
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: TestType;
  status: Status;
  siteId: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: keyof Test | null;
  direction: SortDirection;
}
