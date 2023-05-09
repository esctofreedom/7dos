export const getLocalStorage = () => {
  // wait until
  let history;
  if (typeof window !== "undefined") {
    history = JSON.parse(localStorage.getItem("7dos"));
  }
  return history;
};
