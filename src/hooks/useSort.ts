import { useState } from 'react';

export type SortConfig<T> = {
  key: keyof T | null;
  direction: 'asc' | 'desc';
};

export function useSort<T>() {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key: keyof T) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const sortItems = (items: T[], customSort?: (a: T, b: T) => number) => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      if (customSort) {
        return sortConfig.direction === 'asc'
          ? customSort(a, b)
          : customSort(b, a);
      }

      const aValue = String(a[sortConfig.key as keyof T]);
      const bValue = String(b[sortConfig.key as keyof T]);
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  return { sortConfig, handleSort, sortItems };
}
