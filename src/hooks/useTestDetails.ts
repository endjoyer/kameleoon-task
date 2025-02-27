import { useEffect, useState } from 'react';
import { getTestById, getSiteById } from '../api';
import { Site, Test } from '../types';

export function useTestDetails(testId: string) {
  const [test, setTest] = useState<Test | null>(null);
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        setLoading(true);
        const testResponse = await getTestById.getById(Number(testId));
        const test = testResponse.data;
        setTest(test);

        const siteResponse = await getSiteById.getById(test.siteId);
        setSite(siteResponse.data);
      } catch (err) {
        setError('Failed to load test details');
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [testId]);

  return { test, site, loading, error };
}
