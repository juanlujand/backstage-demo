import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import { techRadarApiRef } from '@backstage-community/plugin-tech-radar';
import { TechRadarClient } from './lib/TechRadarClient';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),
  createApiFactory({
    api: techRadarApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
    },
    factory: ({ discoveryApi }) => new TechRadarClient(discoveryApi),
  }),
];
