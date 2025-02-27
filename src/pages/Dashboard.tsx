import React, { useEffect, useState } from 'react';
import { DashboardTable } from '@/components';
import { useSort } from '@/hooks/useSort';
import { getTestById, getSiteById } from '@/api';
import { Site, Test } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import LoadingError from '@/components/LoadingError';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [sites, setSites] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { sortConfig, handleSort, sortItems } = useSort<Test>();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [testsResponse, sitesResponse] = await Promise.all([
        getTestById.getAll(),
        getSiteById.getAll(),
      ]);

      setTests(testsResponse.data);
      const formattedSites = sitesResponse.data.reduce<Record<number, string>>(
        (acc, site: Site) => {
          acc[site.id] = site.url;
          return acc;
        },
        {}
      );
      setSites(formattedSites);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <LoadingError onReload={fetchData} />
      </div>
    );
  }

  const sortedTests = sortItems(tests);

  return (
    <div className="dashboard">
      <DashboardTable
        tests={sortedTests}
        sites={sites}
        loading={loading}
        error={error}
        onReload={fetchData}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
};

export default Dashboard;
