/*global respostas, L, coordenadas, cor, percentageToColor*/
'use strict';

var map = L.map('map').setView([-4.268354791442122, -38.39035034179688], 9),
    baseLayers = {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        'Google Maps': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Satélite': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Híbrido': L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}')
    },
    layers = {
        "Antes->Durante": {
            "Aracati": L.layerGroup(),
            "Canindé": L.layerGroup(),
            "Beberibe": L.layerGroup(),
            "Fortaleza": L.layerGroup(),
            "Jaguaruana": L.layerGroup(),
            "Morada Nova": L.layerGroup(),
            "Surubim": L.layerGroup(),
            "Icapuí": L.layerGroup(),
            "Limoeiro do Norte": L.layerGroup(),
            "Itaiçaba": L.layerGroup(),
            "Eusébio": L.layerGroup(),
            "Cascavel": L.layerGroup()
        },
        "Durante->Depois": {
            "Aracati": L.layerGroup(),
            "Canindé": L.layerGroup(),
            "Beberibe": L.layerGroup(),
            "Fortaleza": L.layerGroup(),
            "Jaguaruana": L.layerGroup(),
            "Morada Nova": L.layerGroup(),
            "Surubim": L.layerGroup(),
            "Icapuí": L.layerGroup(),
            "Limoeiro do Norte": L.layerGroup(),
            "Itaiçaba": L.layerGroup(),
            "Eusébio": L.layerGroup(),
            "Cascavel": L.layerGroup()
        },
        "Antes->Depois": {
            "Aracati": L.layerGroup(),
            "Canindé": L.layerGroup(),
            "Beberibe": L.layerGroup(),
            "Fortaleza": L.layerGroup(),
            "Jaguaruana": L.layerGroup(),
            "Morada Nova": L.layerGroup(),
            "Surubim": L.layerGroup(),
            "Icapuí": L.layerGroup(),
            "Limoeiro do Norte": L.layerGroup(),
            "Itaiçaba": L.layerGroup(),
            "Eusébio": L.layerGroup(),
            "Cascavel": L.layerGroup()
        }
    },
    overLayers = [
        {
            groupName: "Antes->Durante",
            layers: layers['Antes->Durante']
        },
        {
            groupName: "Durante->Depois",
            layers: layers['Durante->Depois']
        },
        {
            groupName: "Antes->Depois",
            layers: layers['Antes->Depois']
        }
    ],
    cidadesPlotadas = {};
baseLayers['Google Maps'].addTo(map);

var existe = function (str) {
    var valor = cidadesPlotadas[str];
    if (valor) {
        valor += 1;
        cidadesPlotadas[str] = valor;
        return valor;
    }
    cidadesPlotadas[str] = 1;
    return 1;
};
var doAfter = [];

var criarFiltor = function (layer, origem, destino) {
    var latlon = [coordenadas[origem], coordenadas[destino]],
        color = cor[destino],
        ext = existe(latlon.toString() + layer),
        polyline = L.polyline(latlon, {color: color}).addTo(layers[layer][destino]);
    L.polylineDecorator(polyline, {
        patterns: [{
            offset: '10%',
            endOffset: '10%',
            repeat: 50,
            symbol: L.Symbol.arrowHead({
                pixelSize: 10,
                pathOptions: {
                    strock: false,
                    color: color,
                    fill: true,
                    fillColor: color,
                    fillOpacity: 1,
                    weight: 2
                }
            })
        }]
    }).addTo(layers[layer][destino]);
    doAfter.push(function () {
        layers[layer][destino].addLayer(
            L.circle(latlon[0], {
                color: 'black',
                radius: 1000 * ext + 1000,
                fill: true,
                fillOpacity: 1,
                fillColor: percentageToColor(ext / respostas.length),
                zIndexOffset: 1000
            }).bindPopup('<p>' + origem + '</p>' + '<p>' + ext + ' aluno(s)</p>')
        );
    });
};

respostas.forEach(function (resposta) {
    criarFiltor('Antes->Durante', resposta[0], resposta[1]);
    criarFiltor('Durante->Depois', resposta[1], resposta[2]);
    criarFiltor('Antes->Depois', resposta[0], resposta[2]);
});
doAfter.forEach(function (fn) {
    fn();
});


var options = {
    container_width: "300px",
    group_maxHeight: "350px",
    exclusive: false,
    collapsed: true,
    position: 'topright'
};
var control = L.Control.styledLayerControl(baseLayers, overLayers, options);
map.addControl(control);