function displayResults(mode, key) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('results');

    issuesList.innerHTML = '';
    keys = key.split(" ");

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        if (mode === 'id') {
            found = false;
            for (const subkey in keys) {
                if (id.includes(keys[subkey])) found = true;
            }
            if (!found) continue;
        }

        if (mode === 'desc') {
            found = false;
            for (const subkey in keys) {
                if (desc.toLowerCase().includes(keys[subkey].toLowerCase())) found = true;
            }
            if (!found) continue;
        }


        for (const subkey in keys) {
            id = id.replace(keys[subkey], "<b>" + keys[subkey] + "</b>");
        }

        for (const subkey in keys) {
            if ((keys[subkey] === '<') || (keys[subkey] === '/') || (keys[subkey] === 'b') || (keys[subkey] === '>')) continue;
            desc = desc.replace(keys[subkey], "<b>" + keys[subkey] + "</b>");
        }

        let assignedIcon = '';
        if (assignedTo != '') assignedIcon = '<span class="glyphicon glyphicon-user"></span> ';

        issuesList.innerHTML += '<div class="well">'+
                                    '<h6>Issue ID: ' + id + '</h6>'+
                                    '<p><span class="label label-info">' + status + '</span></p>'+
                                    '<h3>' + desc + '</h3>'+

                                    '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' + assignedIcon + assignedTo + '</p>'+

                                    '<a href="" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                    '<a href="" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
}

function lookForID() {

    let key = document.getElementById('IDSearchInput').value;

    if (!(/^\d+$/.test(key.replace(" ", "")))) {
        alert("IDs only contain numbers.");
        return;
    }

    displayResults('id', key);

    document.getElementById('searchByID').reset();
}

function lookForDesc() {

    let key = document.getElementById('DescSearchInput').value;
    displayResults('desc', key);

    document.getElementById('searchByDesc').reset();
}