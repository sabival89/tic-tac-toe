/**
 * Create an array with a given number of elements or size
 * @param numberOfElements
 * @returns
 */
export const createArrayAttributes = (numberOfElements: number) => {
  return [{ squares: Array(numberOfElements).fill(null) }];
};
