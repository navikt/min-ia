import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../utils/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const data = await fetch(`${process.env.KURSOVERSIKT_BASE_URL}/api/kurs`, {})
    .then((res) => res.json())
    .catch((reason) => {
      logger.warn(reason);
    });

  return res.status(200).json(data);
}
