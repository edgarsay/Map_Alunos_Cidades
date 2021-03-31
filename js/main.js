/*global respostas, L, coordenadas, cor, numberToColor, getJSON, console*/
'use strict';

var map = L.map('map').setView([-4.268354791442122, -38.39035034179688], 9),
    baseLayers = {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        'Google Maps': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Satélite': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'),
        'Google Híbrido': L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}')
    },
    overLayers = {
        "Antes": L.layerGroup(),
        "Depois": L.layerGroup(),
        "Antes (mapa de calor)": L.layerGroup(),
        "Depois (mapa de calor)": L.layerGroup(),
        "Antes (Choropleth)": L.layerGroup(),
        "Depois (Choropleth)": L.layerGroup()
    };
baseLayers['Google Maps'].addTo(map);

//contar quantos pessoas havia em cada cidade ante e depois
var holder = {},
    counter = function (name) {
        var holderName = holder[name];
        if (holderName) {
            holderName += 1;
        } else {
            holderName = 1;
        }
        holder[name] = holderName;
    },
    get = function (cidade) {
        var holderName = holder[cidade];
        if (holderName) {
            return holderName;
        }
        return 0;
    };

// contando aluno em cada cidade e migrações
respostas.forEach(function (resposta) {
    var origem = resposta[0],
        destino = resposta[2];
    counter('Antes' + origem); // total de pessoas em resposta[0] antes
    counter('Depois' + destino); // total de pessoas em resposta[3] depois
    counter(origem + destino); // total de pessoas que foram de rep[0] p/ rep[2]
});

// pegar geo data base para o Choropleth map
getJSON('/json/cidades.json', function (err, res) {
    ['Antes', 'Depois'].forEach(function (layer) {
        var style = function (feature) {
            var cidade = feature.properties.NOME,
                alunos = get(layer + cidade);
            return {
                fillColor: numberToColor(alunos),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        };
        if (err) {
            console.error(err);
        }
        L.geoJson(res, {style: style})
            .addTo(overLayers[layer + ' (Choropleth)']);
    });
});
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 13 , 14],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + numberToColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);

var criadorPopup = function (layer, cidade) {
    var numALunos = get(layer + cidade),
        text = layer + ' ' + cidade + ' : ' + numALunos;
    if (layer === 'Antes') {
        return text;
    }
    Object.keys(coordenadas).forEach(function (origem) {
        var nVindo = get(origem + cidade);
        if (nVindo) {
            text += '<p style="color:' + cor[origem] + ';">' + origem + ' : ' + nVindo + '</p>';
        }
    });
    return text;
};

// desenhando circulos para representaso os alunos em cada cidade
var pontos = {
    'Antes': [],
    'Depois': []
};
Object.keys(coordenadas).forEach(function (cidade) {
    ['Antes', 'Depois'].forEach(function (layer) {
        var coor = coordenadas[cidade],
            alunos = get(layer + cidade);

        // guardando ponto para os mapas de calor [lat, lng, intensity]
        pontos[layer].push([coor[0], coor[1], alunos * 100 + 100]);

        // criando mapas de circulos
        L.circle(coor, {
            radius: (alunos * 500) + 250,
            color: 'black',
            weight: 1,
            fillColor: cor[cidade],
            fillOpacity: 1
        }).bindPopup(criadorPopup(layer, cidade))
            .addTo(overLayers[layer]);
    });
});

// criando mapas de calor
['Antes', 'Depois'].forEach(function (layer) {
    L.heatLayer(pontos[layer], {radius: 25}).addTo(overLayers[layer + ' (mapa de calor)']);
});

//desenhando movimentações
var migrationData = [];
respostas.sort(function (resposta1, resposta2) {
    return get(resposta1[0] + resposta1[2]) < get(resposta2[0] + resposta2[2]);
});
respostas.forEach(function (resposta) {
    var origem = resposta[0],
        destino = resposta[2],
        nAlunos = get(origem + destino);
    if (origem === destino) {
        return;
    }
    L.swoopyArrow(coordenadas[origem], coordenadas[destino], {
        iconAnchor: [0, 0],
        iconSize: [20, 16],
        color: cor[origem],
        weight: nAlunos / 5 + 1,
        factor: 1,
        arrowFilled: true
    }).addTo(overLayers.Depois);
});

// overLayers.Depois.addTo(map);

L.control.layers(baseLayers, overLayers).addTo(map);