import { Parser } from 'json2csv';

export const generateCSV = (data: any[], fields: string[]) => {
  const opts = { fields };
  const parser = new Parser(opts);
  return parser.parse(data);
};
