//CIDADE ANTES,CIDADE DURANTE,CIDADE DEPOIS,
'use strict';

var perc2color = function (perc) {
    var r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    } else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
};

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
    ["Icapuí", "Icapuí", "Fortaleza"]
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
    "Aracati": '#111144',
    "Canindé": '#661166',
    "Beberibe": ' #881111',
    "Fortaleza": '#aa5511',
    "Jaguaruana": '#cccc11',
    "Morada Nova": '#c5d2db',
    "Surubim": '#2096ba',
    "Icapuí": '#eabcac',
    "Limoeiro do Norte": '#c5919d',
    "Itaiçaba": '#df6e21',
    "Eusébio": '#f9994b',
    "Cascavel": '#fbcb5a'
};
