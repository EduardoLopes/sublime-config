function Config(){
    this.config = {};     
}

Config.prototype.setConfig = function(what, arg) {
    this.config[what] = arg;
};

Config.prototype.setFontOptions = function(arg) { 
    if(this.config.font_options == undefined) {
            this.config.font_options = [];
    }

    this.config.font_options.push(arg);
};

Config.prototype.removeFontOptions = function(arg) {    
    var index = this.config.font_options.indexOf(arg);
    this.config.font_options.splice(index, 1);
    if(this.config.font_options.length == 0) {
        delete this.config.font_options;
    }
};

Config.prototype.getConfig = function(config) {
    return this.config;
};

Config.prototype.removeConfig = function(what) {
    delete this.config[what];
};

Config.prototype.getJson = function() {
    var json = JSON.stringify(c.getConfig(), null, '\t');
    return json.replace(/\"(\d*.\d+|[\d+]|false|true)\"/g,"$1");
};

c = new Config();

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

$( " input[type='number'] " ).change(function(){
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

$('.btn-group').on('click', function(event){
    event.preventDefault();
    var data = $(this).data();
    var value = $(event.toElement).data();
    
    if($(this).children('.btn').hasClass('active')){
        $(this).children('.btn').removeClass('active');
        $(event.toElement).addClass('active');
    } else {
        $(event.toElement).addClass('active');
    }

    if(value.prop == "default"){
        c.removeConfig(data.name);    
    } else {
        c.setConfig(data.name, value.prop);    
    }

    addToTextArea();
});