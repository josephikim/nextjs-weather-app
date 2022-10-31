import type { NextApiRequest, NextApiResponse } from "next";
import { forwardGeocode } from "utils/opencage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  const results = await getSearchResults(query as string);

  res.status(200).json(results);
};

const getSearchResults = async (query: string) => {
  // const response = await fetch(
  //   `https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&hourly=temperature_2m`
  // );

  const response = await forwardGeocode(query);

  return response;
};
