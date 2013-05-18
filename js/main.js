function Config(){
    this.config = {};
    this.configArray =  [
                    'font_options',
                    'rulers',
                    'auto_complete_triggers',
                    'folder_exclude_patterns',
                    'file_exclude_patterns',
                    'binary_file_patterns',
                    'ignored_packages'
                        ]
}

Config.prototype.setConfig = function(what, arg) {
    this.config[what] = arg;
};

Config.prototype.setArrayOptions = function(what, arg) { 
    if(this.config[what] == undefined) {
            this.config[what] = [];
    }
    console.log(this.config[what]);
    this.config[what].push(arg);
};

Config.prototype.removeArrayOptions = function(what, arg) {    
    var index = this.config[what].indexOf(arg);
    this.config[what].splice(index, 1);
    if(this.config[what].length == 0) {
        delete this.config[what];
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

    if(c.configArray.indexOf(data.name) > -1 && $(this).prop('checked') == true) {
        c.setArrayOptions(data.name, value);
    } else if (c.configArray.indexOf(data.name) > -1 && $(this).prop('checked') == false){
        c.removeArrayOptions(data.name, value);
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