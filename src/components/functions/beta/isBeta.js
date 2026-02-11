const isBeta = () => {
  const path = window.location.pathname;
  return path.includes('/beta/') ? true : false;
};

export default isBeta;
