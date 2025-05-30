/*global L:false*/

(function () {
    'use strict';

    L.TileLayer.Kartverket = L.TileLayer.extend({

        baseUrl: 'https://cache.kartverket.no/v1/wmts/1.0.0/{layer}/default/webmercator/{z}/{y}/{x}.png',

        options: {
            maxNativeZoom: 18,
            attribution: '&copy; <a href="http://kartverket.no">Kartverket</a>',
            subdomains: ['', '2', '3']
        },

        mappings: {
            kartdata2: 'topo',
            norgeskart_bakgrunn: 'topo',
            sjo_hovedkart2: 'sjokartraster',
        },

        layers: [
            'topo',
            'topograatone',
            'toporaster',
            'sjokartraster',
        ],

        layerNames: [
            'Topografisk norgeskart',
            'Topografisk norgeskart gråtone',
            'Topografisk norgeskart raster',
            'Sjøkart hovedkartserien',
            null
        ],

        initialize: function (layer, options) {
            if (this.layers.indexOf(layer) === -1) {
                if (this.mappings[layer]) {
                    layer = this.mappings[layer];
                } else {
                    throw new Error('Unknown layer "' + layer + '"');
                }
            }

            L.TileLayer.prototype.initialize.call(this, this.baseUrl, options);
            this.options.layer = layer;
        }

    });

    L.tileLayer.kartverket = function (layer, options) {
        return new L.TileLayer.Kartverket(layer, options);
    };

    L.tileLayer.kartverket.getLayers = function () {
        return L.TileLayer.Kartverket.prototype.layers.slice();
    };

    L.tileLayer.kartverket.getLayerName = function (layer) {
        var idx = L.TileLayer.Kartverket.prototype.layers.indexOf(layer);
        var name = null;
        if (idx !== -1) {
            name = L.TileLayer.Kartverket.prototype.layerNames[idx];
        }
        return (name !== null) ? name : layer;
    };

}());
