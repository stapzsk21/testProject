const getBasePath = () => {
  const path = window.location.pathname;
  return path.includes('/beta/') ? '/beta/' : '/';
};

export default getBasePath;
