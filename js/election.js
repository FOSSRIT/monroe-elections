function intervalHandler() {
    if(clicked != null) {
        var toLoad = loadPrefix + '/contest.html #c' + $(clicked).attr('id');
        $('#contest').load(toLoad);
    }
    $('#progress').load(loadPrefix + '/update.html');
}

function contestLoad() {
    clicked = $(this);
    // This will actually load the data into the div.
    intervalHandler();

    if(activeContest != null) {
        activeContest.removeClass('active');
    }
    activeContest = $(this).parent();
    activeContest.addClass('active');

    return false;
}

function areaLoad() {
    var toLoad = loadPrefix + '/area.html #a'+$(this).attr('id');
    $('#area').load(toLoad, function(data) {
        clickLoad(".loadC", contestLoad);
    });

    if(activeRace != null) {
        activeRace.removeClass('active');
    }
    activeRace = $(this).parent();
    activeRace.addClass('active');

    return false;
}

function electionLoad() {
    // Don't reload another county's results
    $('#area').empty();
    $('#contest').empty();
    clicked = null;

    loadPrefix = 'html/' + $(this).attr('id');
    $('#list').load(loadPrefix + '/area.html #list', function(data) {
        clickLoad(".loadA", areaLoad);
    });
    if(electionInterval != null) {
        clearInterval(electionInterval);
    }
    electionInterval = setInterval(intervalHandler, 60000);

    //Switch active tabs
    if(activeTab != null) {
        activeTab.removeClass('active');
    }
    activeTab = $(this).parent();
    activeTab.addClass('active');

    return false;
}

function clickLoad(element, fn) {
    $(element).click(fn);
    $(element)[0].click();
}

$(document).ready(function() {
    // Populate the tab bar
    $('#tabs').load('html/tabs.html', function(data) {
        clickLoad(".loadE", electionLoad);
    });

    // Set up global variables to help with state
    activeTab = null;
    activeRace = null;
    activeContest = null;
    contestInterval = null;
    electionInterval = null;
});
