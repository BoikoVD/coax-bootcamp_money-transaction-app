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

export const pageCountHelper = (str) => {
  return Number(str.slice(str.indexOf("/") + 1));
};

export const contactsParser = (contactsArray) => {
  let newcontactsArray = [];
  for (let i of contactsArray) {
    newcontactsArray.push(i.contact);
  }
  return newcontactsArray;
};

export function removeDuplicates(arr) {
  const result = [];
  const duplicatesIndices = [];
  arr.forEach((current, index) => {
    if (duplicatesIndices.includes(index)) return;
    result.push(current);
    for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
      const comparison = arr[comparisonIndex];
      const currentKeys = Object.keys(current);
      const comparisonKeys = Object.keys(comparison);
      if (currentKeys.length !== comparisonKeys.length) continue;
      const currentKeysString = currentKeys.sort().join("").toLowerCase();
      const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
      if (currentKeysString !== comparisonKeysString) continue;
      let valuesEqual = true;
      for (let i = 0; i < currentKeys.length; i++) {
        const key = currentKeys[i];
        if (current[key] !== comparison[key]) {
          valuesEqual = false;
          break;
        }
      }
      if (valuesEqual) duplicatesIndices.push(comparisonIndex);
    }
  });
  return result;
}