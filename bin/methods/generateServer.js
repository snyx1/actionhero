var fs = require('fs');

exports['generateServer'] = function(binary, next){

  if(binary.argv.name == null){ binary.utils.hardError('name is a required input') }

  var data = fs.readFileSync(binary.paths.actionhero_root + '/bin/templates/server.js');
  data = String(data);

  [
    'name',
  ].forEach(function(v){
    var regex = new RegExp('%%' + v + '%%', "g");
    data = data.replace(regex, binary.argv[v]);
  });

  binary.utils.create_file_safely(binary.paths.config.server + '/' + binary.argv['name'] + '.js', data);

  next();

}