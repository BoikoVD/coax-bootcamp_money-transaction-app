export const pageHeaderConstructor = (pathname) => {
  if (pathname === "/") {
    return "Dashboard";
  }
  if (pathname === "/profile") {
    return "My profile";
  }
  let title;
  let index = pathname.indexOf("/", 1);
  if (index === -1) {
    title = pathname.slice(1);
  } else {
    title = pathname.slice(1, index);
  }
  return title[0].toUpperCase() + title.slice(1);
};