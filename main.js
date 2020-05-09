function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

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

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(event) {

    let issueID = generateID(4);
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open';

    if (issueDesc == '') {
        alert("Please enter a description");
        return;
    }

    let issue = {
        id: issueID,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    
    for(let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = "Closed";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    
    for(let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function generateID(length) {
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chance.natural({min: 0, max: 9});
    }

    return id;
}