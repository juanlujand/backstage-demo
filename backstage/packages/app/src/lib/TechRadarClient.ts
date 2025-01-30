import {
    TechRadarApi,
    TechRadarLoaderResponse,
  } from '@backstage-community/plugin-tech-radar';
import { DiscoveryApi } from '@backstage/core-plugin-api';
  
  export class TechRadarClient implements TechRadarApi {
    private readonly discoveryApi: DiscoveryApi;

  constructor(discoveryApi: DiscoveryApi) {
    this.discoveryApi = discoveryApi;
  }

  private async getBaseUrl() {
    return `${await this.discoveryApi.getBaseUrl('proxy')}/techradars`;
  }

  async load(id: string | undefined): Promise<TechRadarLoaderResponse> {
    const techRadarBaseUrl = await this.getBaseUrl();

    // if needed id prop can be used to fetch the correct data
    const data = await fetch(`${techRadarBaseUrl}/data-${id}.json`, {
      method: 'GET',
      // https://stackoverflow.com/questions/45696999/fetch-unexpected-end-of-input
      // mode: 'no-cors',
      headers: { accept: 'application/json' },
    }).then(res => res.json());
    // For example, this converts the timeline dates into date objects
    return {
      ...data,
      entries: data.entries.map((entry: { timeline: any[] }) => ({
        ...entry,
        timeline: entry.timeline.map(timeline => ({
          ...timeline,
          date: new Date(timeline.date),
        })),
      })),
    };
  }
}