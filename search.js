// loads all issues that match search
function displayResults(mode, key) {
    // gets issues list from local storage
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('results');

    // this is where new issues' HTML will be put
    issuesList.innerHTML = '';
    // this is where search terms are put
    keys = key.split(" ");

    // loop thru all issues
    for (let i = 0; i < issues.length; i++) {
        // grab information for each issue
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        // if search is by ID
        if (mode === 'id') {
            found = false;
            for (const subkey in keys) {
                // make note that an issue's id contained a searched id
                if (id.includes(keys[subkey])) found = true;
            }
            // if no issue was found, skip over creating html for it
            if (!found) continue;
        }

        // if search is by description
        if (mode === 'desc') {
            found = false;
            for (const subkey in keys) {
                // make note that an issue's description contained a searched term
                if (desc.toLowerCase().includes(keys[subkey].toLowerCase())) found = true;
            }
            // if no issue was found, skip over creating html for it
            if (!found) continue;
        }


        // make searched ids bold
        for (const subkey in keys) {
            id = id.replace(keys[subkey], "<b>" + keys[subkey] + "</b>");
        }

        // make searched descriptions bold
        for (const subkey in keys) {
            // ...unless the search term happens to be the bold tag
            if ((keys[subkey] === '<') || (keys[subkey] === '/') || (keys[subkey] === 'b') || (keys[subkey] === '>')) continue;
            desc = desc.replace(keys[subkey], "<b>" + keys[subkey] + "</b>");
        }

        // if issue has a team assigned, throw in the team icon
        let assignedIcon = '';
        if (assignedTo != '') assignedIcon = '<span class="glyphicon glyphicon-user"></span> ';

        // create new HTML for issue box w/ its info
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

// searches for issue given some IDs
function lookForID() {

    // get id list from form input
    let key = document.getElementById('IDSearchInput').value;

    // if input is not a number, yell at you
    if (!(/^\d+$/.test(key.replace(" ", "")))) {
        alert("IDs only contain numbers.");
        return;
    }

    // call issue HTML loader
    displayResults('id', key);

    // reset form
    document.getElementById('searchByID').reset();
}

// searches for issue given some descriptions
function lookForDesc() {

    // get desc list from form input & call HTML loader
    let key = document.getElementById('DescSearchInput').value;
    displayResults('desc', key);

    // reset form
    document.getElementById('searchByDesc').reset();
}