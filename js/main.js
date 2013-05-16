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

//console.log(c.getJson());

$( "input[type='checkbox']" ).change(function(){
    var data = $(this).data();
    
    if($(this).prop('checked') == true){
        c.setConfig(data.name, data.prop);
    } else {
        c.removeConfig(data.name);
    };
    console.log(c.getJson());
});