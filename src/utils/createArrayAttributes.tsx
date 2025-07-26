/**
 * Create an array with a given number of elements or size
 * @param numberOfElements
 * @returns
 */
const createArrayAttributes = (numberOfElements: number) => [
  { squares: Array(numberOfElements).fill('') },
];

export default createArrayAttributes;
