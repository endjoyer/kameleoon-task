import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status, Test } from '../types';
import LoadingSpinner from './LoadingSpinner';
import SearchInput from './SearchInput';
import SortableTableHeader from './SortableTableHeader';
import StatusBadge from './StatusBadge';
import LoadingError from './LoadingError';
import { SortConfig } from '@/hooks/useSort';

interface DashboardTableProps {
  tests: Test[];
  sites: Record<number, string>;
  loading: boolean;
  error: string | null;
  onReload: () => void;
  sortConfig: SortConfig<Test>;
  onSort: (key: keyof Test) => void;
}

const siteColors: Record<number, string> = {
  1: '#E14165',
  2: '#C2C2FF',
  3: '#8686FF',
};

const DashboardTable: React.FC<DashboardTableProps> = ({
  tests,
  sites,
  loading,
  error,
  onReload,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Test | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSort = (key: keyof Test) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const formatUrl = (url: string) => {
    return url.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '');
  };

  const getColor = (siteId: number) => siteColors[siteId] || '#ccc';

  const filteredAndSortedTests = tests
    .filter((test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === 'status') {
        const statusOrder = {
          [Status.ONLINE]: 1,
          [Status.PAUSED]: 2,
          [Status.STOPPED]: 3,
          [Status.DRAFT]: 4,
        };
        const diff = statusOrder[a.status] - statusOrder[b.status];
        return sortConfig.direction === 'asc' ? diff : -diff;
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

  if (loading) return <LoadingSpinner />;
  if (error) return <LoadingError onReload={onReload} />;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          testsCount={tests.length}
          inputRef={inputRef}
        />
      </div>

      {filteredAndSortedTests.length === 0 ? (
        <div className="no-results">
          <p className="no-results__message">
            Your search did not match any results.
          </p>
          <button
            className="button button--reset"
            onClick={() => setSearchTerm('')}
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <SortableTableHeader
                  label="NAME"
                  field="name"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableTableHeader
                  label="TYPE"
                  field="type"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableTableHeader
                  label="STATUS"
                  field="status"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableTableHeader
                  label="SITE"
                  field="siteId"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <th className="column-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTests.map((test) => (
                <tr key={test.id}>
                  <td
                    style={{ borderLeft: `4px solid ${getColor(test.siteId)}` }}
                  >
                    {test.name}
                  </td>
                  <td>{test.type}</td>
                  <td>
                    <StatusBadge status={test.status} />
                  </td>
                  <td>{formatUrl(sites[test.siteId] || '')}</td>
                  <td>
                    {test.status === Status.DRAFT ? (
                      <button
                        onClick={() => navigate(`/finalize/${test.id}`)}
                        className="button button--secondary"
                      >
                        Finalize
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/results/${test.id}`)}
                        className="button button--primary"
                      >
                        Results
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
