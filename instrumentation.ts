import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR); // set to DEBUG when troubleshooting

export function register() {
  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME || 'theqaguy.co.nz',
    attributes: {
      'deployment.environment': process.env.OTEL_DEPLOYMENT_ENV || 'local',
    },
    traceExporter: new OTLPHttpJsonTraceExporter({
      url: process.env.OTEL_ENDPOINT,
    }),
  });
}
