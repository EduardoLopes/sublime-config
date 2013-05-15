function Config(){
    this.config = {};
}

Config.prototype.setConfig = function(what, arg) {
    this.config[what] = arg;
    //console.log(this.config);
};

Config.prototype.getConfig = function(config) {
    return this.config;
};

Config.prototype.removeConfig = function(what) {
    delete this.config[what];
};

Config.prototype.getJson = function() {
    var json = JSON.stringify(c.getConfig(), null, '\t');
    return json.replace(/\"([^(\")"]+)\":/g,"$1:");
};

c = new Config();
c.setConfig('teste1', true);
c.setConfig('teste2', 10);
c.setConfig('teste3', '3');
c.setConfig('teste4', '4');
c.setConfig('teste5', '5');
c.setConfig('teste6', '6');

//console.log(c.getJson());
