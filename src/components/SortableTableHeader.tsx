import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';
import { Test } from '../types';

interface SortableTableHeaderProps {
  label: string;
  field: keyof Test;
  sortConfig: {
    key: keyof Test | null;
    direction: 'asc' | 'desc';
  };
  onSort: (field: keyof Test) => void;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  label,
  field,
  sortConfig,
  onSort,
}) => {
  return (
    <th onClick={() => onSort(field)}>
      {label}
      {sortConfig.key === field &&
        (sortConfig.direction === 'desc' ? (
          <ChevronUp className="table__sort-icon" />
        ) : (
          <ChevronDown className="table__sort-icon" />
        ))}
    </th>
  );
};

export default SortableTableHeader;
