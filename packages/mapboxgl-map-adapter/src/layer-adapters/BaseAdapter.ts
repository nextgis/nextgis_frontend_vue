import { Map } from 'maplibre-gl';
import { MainLayerAdapter, AdapterOptions } from '@nextgis/webmap';
import { TLayer } from '../MapboxglMapAdapter';

let ID = 0;

export abstract class BaseAdapter<O extends AdapterOptions = AdapterOptions>
  implements MainLayerAdapter<Map, TLayer, O>
{
  layer?: TLayer;
  map?: Map;
  protected readonly _layerId: string;

  constructor(map: Map, public options: O) {
    this.map = map;
    this._layerId = `layer-${ID++}`;
  }

  beforeRemove(): void {
    if (this.map) {
      const sourceId = this._layerId + '_source';
      const source = this.map.getSource(sourceId);
      if (source) {
        this.map.removeSource(sourceId);
      }
    }
    Object.assign(this, { map: undefined });
  }

  abstract addLayer(options: O): TLayer | Promise<TLayer> | undefined;
}
