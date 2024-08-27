export const clearLocalStorage = () => {
    localStorage.clear();
  };
  
  export const clearSessionStorage = () => {
    sessionStorage.clear();
  };
  
  // Clear Cache (may not work in all browsers)
  export const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };
  
  export const handleReload = () => {
    window.location.reload();
  };
  