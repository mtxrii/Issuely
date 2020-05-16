// loads all issues
function fetchIssues() {
    // gets issues list from local storage
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    // this is where new issues' HTML will be put
    issuesList.innerHTML = '';

    // loop thru all issues
    for (let i = 0; i < issues.length; i++) {
        // grab information for each issue
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

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

// registers button listener
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// gets info from form and saves it to new issue
function saveIssue(event) {

    // generate info for new issue from form fields
    let issueID = generateID(4);
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open';

    // yell at you if you leave description blank
    if (issueDesc == '') {
        alert("Please enter a description");
        return;
    }

    // create issue object
    let issue = {
        id: issueID,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    // if issue object doesn't exist, create it in local storage
    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    // else, just edit it
    else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    // reset form
    document.getElementById('issueInputForm').reset();

    // reload issues (show them)
    fetchIssues();

}

// for when close-issue button is pressed
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    
    // find issue
    for(let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        // just change the tag's text
        issues[i].status = "Closed";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

// for when delete-issue button is pressed
function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    
    // find issue
    for(let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        // delete it
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

// generate new random id
function generateID(length) {
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chance.natural({min: 0, max: 9});
    }

    return id;
}