/*global tabela, L, cidadeParaCoordenadas */
'use strict';
var map = L.map('map').setView([-4.268354791442122, -38.39035034179688], 9),
    baseLayers = {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        'Google Maps': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Satélite': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Híbrido': L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}')
    },
    overLayers = {
        'cidades': L.layerGroup(),
        'antesToDurante': L.layerGroup(),
        'durenteToDepois': L.layerGroup(),
        'antesToDepois': L.layerGroup()
    },
    arrowBaseConfig = {
        labelFontSize: 12,
        arrowFilled: true
    },
    counter = {};
baseLayers['Open Street Map'].addTo(map);

var calLabel = function (city1, city2) {
    var arrow = city1 + city2,
        counterArrow = counter[arrow];

    if (counterArrow) {
        counterArrow += '🛉';
    } else {
        counterArrow = '🛉';
    }
    counter[arrow] = counterArrow;
    return counterArrow;
};

var cidadesStr = null;
tabela.forEach(function (cidades) {
    cidadesStr = cidades.map(function (cidade) {
        return String(cidade);
    });
    arrowBaseConfig.color = 'green';
    arrowBaseConfig.label = calLabel(cidadesStr[0], cidadesStr[1]);
    overLayers.antesToDurante.addLayer(L.swoopyArrow(cidades[0], cidades[1],
            arrowBaseConfig));
    arrowBaseConfig.color = 'yellow';
    arrowBaseConfig.label = calLabel(cidadesStr[1], cidadesStr[2]);
    overLayers.durenteToDepois.addLayer(L.swoopyArrow(cidades[1], cidades[2],
            arrowBaseConfig));
    arrowBaseConfig.color = 'red';
    arrowBaseConfig.label = calLabel(cidadesStr[0], cidadesStr[2]);
    overLayers.antesToDepois.addLayer(L.swoopyArrow(cidades[0], cidades[2],
            arrowBaseConfig));
});
overLayers.antesToDepois.addTo(map);

Object.keys(cidadeParaCoordenadas).forEach(function (cidade) {
    overLayers.cidades.addLayer(L.marker(cidadeParaCoordenadas[cidade],
            {opacity: 0.3}).bindTooltip(cidade, {permanent: true}));

});

L.control.layers(baseLayers, overLayers).addTo(map);