const limitLength = (str, max) => str.length > max ? `${str.substring(0, max - 3)}...` : str;
export default limitLength;