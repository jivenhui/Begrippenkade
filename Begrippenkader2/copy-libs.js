var fs = require('fs-extra')

var dependencies = [
    ['node_modules/chart.js/dist/Chart.js','www/build/chart.js'],
    ['src/index.html', 'www/index.html']
];

dependencies.forEach(function(value) {
    fs.copy(value[0],value[1]);
});
