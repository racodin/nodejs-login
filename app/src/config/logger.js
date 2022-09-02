"use strict";

const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, colorize, simple } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "nodejs 로그인",
    }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    levle: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    levle: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

module.exports = logger;
