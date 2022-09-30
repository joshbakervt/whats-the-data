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

// function getCategories(data, subject) {
//     var uniqueCategories = [];
//     var table = "<table>";
//
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].subject == subject) {
//             if (uniqueCategories.includes(data[i].region, 0) == false){
//                 uniqueCategories.push(data[i].region);
//             }
//             // subjectCategories.push(data[i].region);
//         }
//     }
//
//     for (let i = 0; i < uniqueCategories.length; i++) {
//         var row = "<td><strong><a href=" + uniqueCategories[i] + " target=\"_blank\">" + uniqueCategories[i] + "</strong></td>";
//         table += row + "</tr>";
//     }
//
//     return(table + "</table>");
// }
//
// function displayData(data, subject) {
//     var subjectData = [];
//     data.sort();
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].subject == subject) {
//             subjectData.push(data[i]);
//         }
//     }
//
//     var table = "<table>";
//     table += "<tr><td></td><td></td><td>Description</td><td>Study Type</td><td>Size</td><td>Author</td><td>Reference</td></tr>"
//
//     for (let i = 0; i < subjectData.length; i++) {
//         var row = "<td style='text-decoration: underline'><strong><a href=" + subjectData[i].link + " target=\"_blank\">Summary</strong></td>";
//         row += "<td style='text-decoration: underline'><strong><a href=" + subjectData[i].link + " target=\"_blank\">Pubmed</strong></td>";
//         row += "<td>" + subjectData[i].description + "</td>";
//         row += "<td>" + subjectData[i].study_type + "</td>";
//         row += "<td>" + subjectData[i].size + "</td>";
//         row += "<td>" + subjectData[i].author + "</td>";
//         row += "<td>" + subjectData[i].reference + "</td>";
//         // row += "<td>" + subjectData[i].summary + "</td>";
//         // row += "<td>" + subjectData[i].inclusion + "</td>";
//         // row += "<td>" + subjectData[i].exclusion + "</td>";
//         // row += "<td>" + subjectData[i].design_intervention + "</td>";
//         // row += "<td>" + subjectData[i].follow_up + "</td>";
//         // row += "<td>" + subjectData[i].results + "</td>";
//         // row += "<td>" + subjectData[i].notes + "</td>";
//         table += row + "</tr>";
//     }
//     return(table + "</table>");
//     // cD.innerHTML = JSON.stringify(cerebrovascularData[0]);
// }

function getSortedData(data, subject) {
    // Creating a table of links to html ids
    // For each id, create a div with a sticky header and a table of data
    // For each study, create a link to open a new tab
    var uniqueCategories = [];
    var studiesTable = []
    var categoryTable = "<table>";
    var elementsTable = "<div><h1>";

    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            if (uniqueCategories.includes(data[i].region, 0) == false){
                uniqueCategories.push(data[i].region);
            }
            // Going to add all data as hyperlink to id element
            // Define sticky header as id using return function
        }
    }
    uniqueCategories.sort();

    for (let i = 0; i < uniqueCategories.length; i++) {
        var row = "<td><strong><a href=#" + i + ">" + uniqueCategories[i] + "</strong></td>";
        table += row + "</tr>";
    }

    return(table + "</table>");



}

function getCategoriesAsText(data, subject) {
    var categoriesText = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            if (categoriesText.includes(data[i].region, 0) == false){
                categoriesText.push(data[i].region);
            }
            // subjectCategories.push(data[i].region);
        }
    }

    return categoriesText;
}

function getCategories(data, subject) {
    var uniqueCategories = [];
    var table = "<table>";

    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            if (uniqueCategories.includes(data[i].region, 0) == false){
                uniqueCategories.push(data[i].region);
            }
            // Going to add all data as hyperlink to id element
            // Define sticky header as id using return function
        }
    }
    uniqueCategories.sort();

    for (let i = 0; i < uniqueCategories.length; i++) {
        var row = "<td><strong><a href=#" + i + ">" + uniqueCategories[i] + "</strong></td>";
        table += row + "</tr>";
    }

    return(table + "</table>");
}

function displayData(data, subject, categories) {
    var subjectData = [];
    data.sort();
    for (let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            subjectData.push(data[i]);
        }
    }

    var table = "<table>";
    table += "<tr><td></td><td></td><td>Description</td><td>Study Type</td><td>Size</td><td>Author</td><td>Reference</td></tr>"

    // TODO: Create specific table for each region
    // for (let j = 0; j < categories.length; j++) {
    //     var row = "<td>" + categories[j] + "</td>";
    //     table += row + "</tr>";
    // }
    table += categories;
    for (let i = 0; i < subjectData.length; i++) {
        var row = "<td style='text-decoration: underline'><strong><a href=" + subjectData[i].link + " target=\"_blank\">Summary</strong></td>";
        row += "<td style='text-decoration: underline'><strong><a href=" + subjectData[i].link + " target=\"_blank\">Pubmed</strong></td>";
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