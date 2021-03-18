/*global respostas, L, coordenadas, cor, perc2color*/
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

respostas.forEach(function (resposta) {
    var latlon = [coordenadas[resposta[0]], coordenadas[resposta[2]]],
        color = cor[resposta[2]],
        ext = existe(latlon.toString());
    overLayers[resposta[2]].addLayer(L.polyline(latlon, {color: color}));
    overLayers[resposta[2]].addLayer(L.circle(latlon[0], {
        color: 'black',
        radius: 1000 * ext,
        fill: true,
        fillOpacity: 1,
        fillColor: perc2color(ext / resposta.length)
    }).bindPopup('<p>' + ext + ' aluno(s)</p>'));
});
overLayers.Aracati.addTo(map);


L.control.layers(baseLayers, overLayers).addTo(map);