import type { IncomingMessage, ServerResponse } from "http";
import { getStatus } from "mc-server-status";
import { parse } from "url";

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { query }: { query: { ip?: string } } = parse(req.url || "", true);

  const ip = query.ip;
  if (!ip) {
    res.statusCode = 400;
    res.statusMessage = "Missing IP";
    return res.end();
  }
  try {
    const status = await getStatus(ip);
    return status;
  } catch (error) {
    res.statusCode = 400;
    res.statusMessage = 'Failed to fetch the server!';
    return res.end();
  }
};
