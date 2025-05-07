// instrument.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://c4c4a1c730882f2d5383b07e43e58e81@o4509275122958336.ingest.de.sentry.io/4509275191115856",
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});
