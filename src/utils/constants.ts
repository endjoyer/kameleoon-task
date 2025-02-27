import { Status } from '../types';

export const STATUS_ORDER = {
  [Status.ONLINE]: 1,
  [Status.PAUSED]: 2,
  [Status.STOPPED]: 3,
  [Status.DRAFT]: 4,
};

export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
