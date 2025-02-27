export const formatUrl = (url: string): string => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '');
};

export const getSiteColor = (siteId: number): string => {
  const colors: Record<number, string> = {
    1: '#E14165',
    2: '#C2C2FF',
    3: '#8686FF',
  };
  return colors[siteId] || '#cccccc';
};
