/*global respostas, L, coordenadas, cor, percentageToColor*/
'use strict';

var map = L.map('map').setView([-4.268354791442122, -38.39035034179688], 9),
    baseLayers = {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        'Google Maps': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Satélite': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Híbrido': L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}')
    },
    overLayers = {
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
respostas.forEach(function (resposta) {
    var latlon = [coordenadas[resposta[0]], coordenadas[resposta[2]]],
        color = cor[resposta[2]],
        ext = existe(latlon.toString()),
        polyline = L.polyline(latlon, {color: color}).addTo(overLayers[resposta[2]]);
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
    }).addTo(overLayers[resposta[2]]);
    doAfter.push(function () {
        overLayers[resposta[2]].addLayer(
            L.circle(latlon[0], {
                color: 'black',
                radius: 1000 * ext + 1000,
                fill: true,
                fillOpacity: 1,
                fillColor: percentageToColor(ext / resposta.length),
                zIndexOffset: 1000
            }).bindPopup('<p>' + resposta[0] + '</p>' + '<p>' + ext + ' aluno(s)</p>')
        );
    });
});
doAfter.forEach(function (fn) {
    fn();
});
overLayers.Fortaleza.addTo(map);


L.control.layers(baseLayers, overLayers).addTo(map);