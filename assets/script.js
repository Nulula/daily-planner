var nowTime = moment().format('DD MMMM YYYY, HH:mm');
var currentDay = $('#currentDay');
currentDay.text(nowTime);

var clearStorageButton = $('<button class="btn btn-warning">Clear local storage</button>');

var containerEl = $('.container');

var jumbotron = $('.jumbotron');
jumbotron.append(clearStorageButton);

var clearButton = $('.btn-warning');
$(clearButton).on('click',function() {
    localStorage.clear();
    location.reload();
})

//build bootstrap items
for (let e=9;e<18;e++) {
    var rowEl = $('<div class = "row m-1" id="row">');
    rowEl.attr('id',('hour'+(e)));

    var timeEl = $('<div class = "col-2 p-1 border-top border-dark bg-white" id="time">');
    var taskEl = $('<div class = "col-9 p-1 border-right border-white" id="task">');
    var saveEl = $('<div class = "col-1 border-left border-white bg-info d-flex justify-content-center p-0" id="save">');
    var textEl = $('<input type="text" class="form-control mt-3 bg-transparent border-0">'); 
    var textElTime = $('<p class = "mt-4 text-center font-weight-bold">')
    var saveIcon = $('<i class="fa fa-floppy-o fa-lg text-dark"></i>')
    var saveIconButton = $('<button class="btn btn-info btn-block border-rounded-0"></button>')

    timeEl.appendTo(rowEl);
    taskEl.appendTo(rowEl);
    saveEl.appendTo(rowEl);
    textEl.appendTo(taskEl);
    textEl.attr('id','task'+(e));
    saveIconButton.attr('id','task'+(e)); //in case user clicks background
    saveIcon.attr('id','task'+(e)); //in case user clicks icon

    rowEl.appendTo(containerEl);

    textElTime.text((e)+":00");
    textElTime.appendTo(timeEl);
    saveIcon.appendTo(saveIconButton);
    saveIconButton.appendTo(saveEl);

}

var nowHour = parseInt(moment().format('H'));
for (let t=9;t<18;t++) {
    var divHour = $('#hour'+(t));
    if (nowHour>t) {
        divHour.addClass("bg-secondary");
    } else if (nowHour===t) {
        divHour.addClass("bg-danger");
    } else {
        divHour.addClass("bg-success");
    }
}

var taskID = $('input[type=text]');

var saveButton = $('.btn-info');


//save button logic
$(saveButton).on("click", function(event) {
    event.preventDefault();
    var eventTargetId = event.target.id;
    var textInput = $('input:text[id='+eventTargetId+']').val();
    var textInputId=$('input:text[id='+eventTargetId+']').attr('id');
    for (let o=0;o<9;o++) {
        if (eventTargetId === textInputId) {
            localStorage.setItem("time",JSON.stringify(eventTargetId));
            localStorage.setItem("task",JSON.stringify(textInput));
        }
    }

    let stTime = JSON.parse(localStorage.getItem("time"));
    let stTask = JSON.parse(localStorage.getItem("task"));

    let storage = localStorage.getItem("storage") || '[]';
    storage = JSON.parse(storage);
    storage.push({time: stTime, task: stTask});
    localStorage.setItem("storage",JSON.stringify(storage));

});

//refresh window logic
$(window).on('load', function() {
    let storageRecall = JSON.parse(localStorage.getItem("storage"));
    try {
    for (let r=0;r<storageRecall.length;r++) {
        var textInputIdR = $('input:text[id='+storageRecall[r].time+']').attr('id');
        if (storageRecall[r].time === textInputIdR) {
            $('input:text[id='+storageRecall[r].time+']').val(storageRecall[r].task);
        }
    }}
    catch(err) {
        console.log("You have nothing saved in the calendar");
    }
});

