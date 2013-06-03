function Config() {
    this.config = {};
    this.configArray = [
            'font_options',
            'rulers',
            'indent_guide_options',
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
    if (this.config[what] == undefined) {
        this.config[what] = [];
    }
    this.config[what].push(arg);
};

Config.prototype.removeArrayOptions = function(what, arg) {
    var index = this.config[what].indexOf(arg);
    this.config[what].splice(index, 1);
    if (this.config[what].length == 0) {
        delete this.config[what];
    }
};

Config.prototype.getConfig = function() {
    return this.config;
};

Config.prototype.removeConfig = function(what) {
    delete this.config[what];
};

Config.prototype.getJson = function() {
    var json = JSON.stringify(this.getConfig(), null, '\t');
    return json.replace(/\"(\d*.\d+|[\d+]|false|true)\"/g, "$1");
};

settings = new Config();

function addToTextArea() {
    $(".result").text(settings.getJson());
}

$("input[type='checkbox']").change(function() {
    var data = $(this).data();
    var value = this.value;

    if (settings.configArray.indexOf(data.name) > -1 && $(this).prop('checked') == true) {
        settings.setArrayOptions(data.name, value);
    } else if (settings.configArray.indexOf(data.name) > -1 && $(this).prop('checked') == false) {
        settings.removeArrayOptions(data.name, value);
    } else {

        if ($(this).prop('checked') == true) {
            settings.setConfig(data.name, value);
        } else {
            settings.removeConfig(data.name);
        };
    }

    addToTextArea();
});

$(" input[type='number'].onChange ").on('keyup change', function() {
    var data = $(this).data();
    var value = this.value;


    if (data.name == "scroll_speed") value = parseFloat(value).toFixed(1);

    if (value == "" || value == "NaN")
        settings.removeConfig(data.name);
    else
        settings.setConfig(data.name, value);

    addToTextArea();
});

$("select").change(function() {
    var data = $(this).data();
    var value = $("option:selected", this).val();
    if (value == 'default') {
        settings.removeConfig(data.name);
    } else {
        settings.setConfig(data.name, value);
    }
    addToTextArea();
});


$('button.default').on('click', function() {
    var btn = $(this).prev();
    btn.val("");
    var data = btn.data();
    settings.removeConfig(data.name);
    addToTextArea();
});

$('.btn-group').on('click', function(event) {
    event.preventDefault();
    var data = $(this).data();
    var value = $(event.target).data();

    if ($(this).children('.btn').hasClass('active')) {
        $(this).children('.btn').removeClass('active');
        $(event.target).addClass('active');
    } else {
        $(event.target).addClass('active');
    }

    if (value.prop == "default") {
        settings.removeConfig(data.name);
    } else {
        settings.setConfig(data.name, value.prop);
    }

    addToTextArea();
});

$('.addRule').on('click', function(event) {
    event.preventDefault();

    var data = $(event.target).data();
    var value = $('#rulers').val();

    var textWidthBth = "<div class='text-with-btn'>" + value + "</div>";
    var btn = "<button class='btn ruler' type='button' data-name='rulers' data-prop='" + value + "'><i class='icon-remove'></i></button>";
    var html = "<div class='ruleContainer'> " + textWidthBth + btn + " <div>";

    if (value) {

        if (settings.getConfig()[data.name] != undefined && settings.getConfig()[data.name].indexOf(value) != -1 || value == 0) {
            $('#rulers').addClass('invalid');
        } else {
            settings.setArrayOptions(data.name, value);
            $('.rulers .input-append .row').append(html);
            $('#rulers, .text-with-btn').removeClass('invalid');
        }

    } else {
        $('#rulers').addClass('invalid');
    }

    addToTextArea();
});

$(document).on('click', '.ruler', function(event) {
    $(this).parent().remove();
    var data = $(this).data();
    var value = data.prop.toString();

    settings.removeArrayOptions(data.name, value);
    addToTextArea();
});

$("i[rel='tooltip']").popover({
    trigger: 'hover'
});