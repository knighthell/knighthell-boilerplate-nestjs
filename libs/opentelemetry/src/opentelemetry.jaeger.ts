import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { TypeormInstrumentation } from 'opentelemetry-instrumentation-typeorm';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';

const jaegerExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const otelSDK = new NodeSDK({
  spanProcessor: new SimpleSpanProcessor(jaegerExporter),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
    }),
    new TypeormInstrumentation(),
    // new KafkaJsInstrumentation(),
  ],
});

export const initializeJaegerOpenTelemetryNodeSDK = async (
  serviceName: string,
) => {
  otelSDK.addResource(
    Resource.default().merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      }),
    ),
  );
  // gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    otelSDK
      .shutdown()
      .then(
        () => console.log('otelSDK shut down successfully'),
        (err) => console.log('Error shutting down otelSDK', err),
      )
      .finally(() => process.exit(0));
  });

  return otelSDK;
};
