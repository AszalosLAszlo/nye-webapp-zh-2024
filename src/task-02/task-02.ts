export interface Item {
  id: number;
  name: string;
}
export const uniqueFilter = (array: Item[]): Item[] => {
  const uniqueArray: Item[] = [];

  for (let i = 0; i < array.length; i++) {
    let isUnique = true;
    for (let j = 0; j < uniqueArray.length; j++) {
      if (array[i].id === uniqueArray[j].id) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      uniqueArray.push(array[i]);
    }
  }
return uniqueArray;
};