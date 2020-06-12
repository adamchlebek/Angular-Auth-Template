var normalizedPath = require("path").join(__dirname, "../models");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("../models/" + file);
});