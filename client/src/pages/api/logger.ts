import pino, { BaseLogger } from "pino";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { logger } from "../../utils/logger";
import { predefinerteFeilmeldinger } from "../../utils/logger";

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;
type NonEmptyStringArray = [string, ...string[]]

const levels: Record<LogLevels, LogLevels> = {
  "error": "error",
  "debug": "debug",
  "fatal": "fatal",
  "info": "info",
  "trace": "trace",
  "silent": "silent",
  "warn": "warn",
} as const;

export const tekniskeLoggFeil = {
  manglendeEllerMalformetMelding: "Prøver å logge en malformet eller manglende loggmelding",
  ikkePredefinertMelding: "Prøver å logge en ikke predefinert loggmelding"
}

function isValidLoggingLabel(label: unknown): label is LogLevels {
  return typeof label === "string" && label in levels;
}

function isNonEmptyStringArray(message: unknown): message is NonEmptyStringArray {
  try{
    z.string().array().min(1).parse(message)
    return true
  } catch (e) {
    return false
  }
}

function getMessage(message: unknown) {
  if (!isNonEmptyStringArray(message)){
    return tekniskeLoggFeil.manglendeEllerMalformetMelding
  }
  if(isNonEmptyStringArray(message) && Object.values(predefinerteFeilmeldinger).includes(message[0])) {
    return message[0]
  }
  return tekniskeLoggFeil.ikkePredefinertMelding
}

const loggingHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { level, ts }: pino.LogEvent = req.body;

  const message = getMessage(req.body.messages);

  const label: unknown = Object.values(tekniskeLoggFeil).includes(message) ? levels.error : level.label
  if (!isValidLoggingLabel(label)) {
    res.status(400).json({ error: `Invalid label ${label}` });
    return;
  }


  logger
    .child({
      x_timestamp: ts,
      x_isFrontend: true,
      x_userAgent: req.headers['user-agent'],
      x_request_id: req.headers['x-request-id'] ?? 'not-set',
    })
    [label](message);

  res.status(200).json({ ok: `ok` });
}

export default loggingHandler;
