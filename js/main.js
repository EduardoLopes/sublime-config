function Config(){
    this.config = {};
    this.config.font_options = [];
}

Config.prototype.setConfig = function(what, arg) {
    this.config[what] = arg;
    //console.log(this.config);
};

Config.prototype.setFontOptions = function(arg) {    
        this.config.font_options.push(arg);
};

Config.prototype.removeFontOptions = function(arg) {    
    var index = this.config.font_options.indexOf(arg);
    this.config.font_options.splice(index, 1);
};

Config.prototype.getConfig = function(config) {
    return this.config;
};

Config.prototype.removeConfig = function(what) {
    delete this.config[what];
};

Config.prototype.getJson = function() {
    var json = JSON.stringify(c.getConfig(), null, '\t');
    return json.replace(/\"(\d*.\d+|[\d+]|false|true)\"/,"$1");
};

c = new Config();

//console.log(c.getJson());

function addToTextArea(){
    $(".result").text(c.getJson());
}

$( "input[type='checkbox']" ).change(function(){
    var data = $(this).data();
    var value = this.value;

    if(data.name == "font_options" && $(this).prop('checked') == true) {
        c.setFontOptions(value);
    } else if (data.name == "font_options" && $(this).prop('checked') == false){
        c.removeFontOptions(value);
    } else {

        if($(this).prop('checked') == true){
            c.setConfig(data.name, value);
        } else {
            c.removeConfig(data.name);
        };

    }

    addToTextArea();
});

$( " input[type='number']" ).change(function(){
    var data = $(this).data();
    var value = this.value;
    if(data.name == "scroll_speed") value = parseFloat(value).toFixed(1);

    if(value == "" || value == "NaN")
        c.removeConfig(data.name);
    else
        c.setConfig(data.name, value);

    addToTextArea();
});

$("select").change(function(){
    var data = $(this).data();
    var value = $("option:selected", this).val();
    if(value == 'none'){
        c.removeConfig(data.name);
    } else {
        c.setConfig(data.name, value);    
    }
    addToTextArea();
});

$('button.default').on('click', function(){
    var btn = $(this).prev();
    btn.val("");
    var data = btn.data();
    c.removeConfig(data.name);
    addToTextArea();
});