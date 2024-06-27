const getLocalStorageUserData = () => {
  try {
    const data = localStorage.getItem("userData");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};

const getLocalStorageIsAuthenticated = () => {
  try {
    const data = localStorage.getItem("isAuthenticated");
    return data ? data : null;
  } catch (err) {
    return null;
  }
};

const setLocalStorageUserData = ({ userData, isAuthenticated }) => {
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("isAuthenticated", isAuthenticated);
};

const clearLocalStorageData = () => {
  try {
    localStorage.clear();
  } catch (error) {
    // console.log(error);
  }
};

export {
  getLocalStorageUserData,
  getLocalStorageIsAuthenticated,
  setLocalStorageUserData,
  clearLocalStorageData,
};
