/*global  XMLHttpRequest*/
'use strict';
//utils:
var numberToColor = function (n) {
        if (n > 14) {
            return '#800026';
        } else if (n > 14) {
            return'#BD0026';
        } else if (n > 13) {
            return '#E31A1C';
        } else if (n > 3) {
            return '#FC4E2A';
        } else if (n > 2) {
            return '#FD8D3C';
        } else if (n > 1) {
            return '#FEB24C';
        } else if (n > 0) {
            return '#FED976';
        } else {
            return '#00800000';
        }
    },
    getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

//dados:
var respostas = [
    ["Aracati", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Canindé"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Beberibe", "Beberibe", "Aracati"],
    ["Aracati", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Aracati"],
    ["Cascavel", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Jaguaruana", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Jaguaruana", "Aracati", "Fortaleza"],
    ["Morada Nova", "Aracati", "Fortaleza"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Surubim", "Aracati", "Surubim"],
    ["Aracati", "Aracati", "Icapuí"],
    ["Fortaleza", "Aracati", "Fortaleza"],
    ["Limoeiro do Norte", "Aracati", "Aracati"],
    ["Icapuí", "Aracati", "Eusébio"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Aracati", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Aracati"],
    ["Aracati", "Aracati", "Aracati"],
    ["Itaiçaba", "Itaiçaba", "Fortaleza"],
    ["Aracati", "Aracati", "Fortaleza"],
    ["Morada Nova", "Aracati", "Morada Nova"],
    ["Fortaleza", "Aracati", "Fortaleza"],
    ["Icapuí", "Icapuí", "Fortaleza"],
    ["Aracati", "", "Fortaleza"],
    ["Icapuí", "", "Aracati"]
];
var coordenadas = {
    "Aracati": [-4.5583, -37.7679],
    "Canindé": [-4.3548, -39.3109],
    "Beberibe": [-4.1810, -38.1298],
    "Fortaleza": [-3.7305, -38.5218],
    "Cascavel": [-4.1285313, -38.2738054],
    "Jaguaruana": [-4.8315, -37.7810],
    "Morada Nova": [-5.1077, -38.3728],
    "Surubim": [-7.8424, -35.7540],
    "Icapuí": [-4.7158, -37.3535],
    "Limoeiro do Norte": [-5.1456, -38.0985],
    "Itaiçaba": [-4.6805, -37.8240],
    "Eusébio": [-3.8890, -38.4547]
};

var cor = {
    "Aracati": 'red',
    "Fortaleza": 'pink',
    "Canindé": 'purple',
    "Beberibe": 'amber',
    "Jaguaruana": 'teal',
    "Morada Nova": 'yellow',
    "Surubim": 'cyan',
    "Icapuí": 'green',
    "Limoeiro do Norte": 'lime',
    "Itaiçaba": 'grey',
    "Eusébio": 'brown',
    "Cascavel": 'blue'
};
// Red
// Pink
// Purple
// Deep Purple
// Indigo
// Blue
// Light Blue
// Cyan
// Teal
// Green
// Light Green
// Lime
// Yellow
// Amber
// Orange
// Deep Orange
// Brown
// Grey
// Blue Grey