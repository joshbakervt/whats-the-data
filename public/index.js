function getResponse() {
    fetch("https://gliui2ynyk.execute-api.us-east-1.amazonaws.com/default/getCerebrovascularData")
        .then((response) => response.json())
        .then(data => {
            // do some stuff
            return data;
        })
        .catch(error => {
            return error;
        });
}

function getCategories(data, subject) {
    var uniqueCategories = [];
    var table = "<table>";

    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            if (uniqueCategories.includes(data[i].region, 0) == false){
                uniqueCategories.push(data[i].region);
            }
            // subjectCategories.push(data[i].region);
        }
    }

    for (let i = 0; i < uniqueCategories.length; i++) {
        var row = "<td><strong><a href=" + uniqueCategories[i] + " target=\"_blank\">" + uniqueCategories[i] + "</strong></td>";
        table += row + "</tr>";
    }

    return(table + "</table>");
}

function displayData(data, subject) {
    var subjectData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            subjectData.push(data[i]);
        }
    }

    var table = "<table>";
    table += "<tr><td></td><td></td><td>Description</td><td>Study Type</td><td>Size</td><td>Author</td><td>Reference</td></tr>"

    for (let i = 0; i < subjectData.length; i++) {
        var row = "<td><strong><a href=" + subjectData[i].link + " target=\"_blank\">Summary</strong></td>";
        row += "<td><strong><a href=" + subjectData[i].link + " target=\"_blank\">Pubmed</strong></td>";
        row += "<td>" + subjectData[i].description + "</td>";
        row += "<td>" + subjectData[i].study_type + "</td>";
        row += "<td>" + subjectData[i].size + "</td>";
        row += "<td>" + subjectData[i].author + "</td>";
        row += "<td>" + subjectData[i].reference + "</td>";
        // row += "<td>" + subjectData[i].summary + "</td>";
        // row += "<td>" + subjectData[i].inclusion + "</td>";
        // row += "<td>" + subjectData[i].exclusion + "</td>";
        // row += "<td>" + subjectData[i].design_intervention + "</td>";
        // row += "<td>" + subjectData[i].follow_up + "</td>";
        // row += "<td>" + subjectData[i].results + "</td>";
        // row += "<td>" + subjectData[i].notes + "</td>";
        table += row + "</tr>";
    }
    return(table + "</table>");
    // cD.innerHTML = JSON.stringify(cerebrovascularData[0]);
}