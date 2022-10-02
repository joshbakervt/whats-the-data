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


function retrieveAllData(data, subject) {
    // A dictionary of regions to id values
    let regionDict = new Map();
    // A dictionary of currentIDs to data displays
    let allDataDict = new Map();
    // Iterator for id elements
    var currentID = 0;
    // An HTML table containing all regions as links to id iteratives
    var regionLinks = "<div><table>";
    // An HTML table containing all data, with a sticky header by region
    var allData;
    var regionID;
    var appendedData;
    for(let i = 0; i < data.length; i++) {
        if (data[i].subject == subject) {
            if (regionDict.has(data[i].region)) {
                // Region exists in map, so it is already a link
                console.log("found", data[i].region, " at ", regionDict.get(data[i].region));
                regionID = regionDict.get(data[i].region);
                appendedData = addToExistingRegionElement(allDataDict.get(regionID), data[i]);
                // Add the summarized data to the existing key in the map
                allDataDict.set(regionID, appendedData);
                allData += allDataDict.get(regionID);
            } else {
                console.log("adding", data[i].region);
                // Add the key value pair to regionDict
                regionDict.set(data[i].region, currentID);
                // Add the region to regionLinks
                regionLinks = addToRegionLinks(regionLinks, data[i].region, currentID);
                // Add a new key value pair in allDataDict, key is currentID, value is data[i]
                allDataDict.set(currentID, addFirstRegionElement(currentID, data[i]));
                currentID += 1;
            }
        }
        regionLinks += "</table></div>";
    }
}

function addToRegionLinks(regionLinks, region, currentID) {
    // Add a table element with a link to id of currentID
    regionLinks +=("<tr><td><a href='#" + currentID + "'> " + region + "</a></tr></td>");
    return regionLinks;
    // return regionLinks
}

function addFirstRegionElement(currentID, dataAtI) {
    var table = "<tr><h1 id='" + currentID + "'></h1></tr>";
    var row = "<tr><td style='text-decoration: underline'><strong><a href=" + dataAtI.link + " target=\"_blank\">Summary</strong></td>";
    row += "<td style='text-decoration: underline'><strong><a href=" + dataAtI.link + " target=\"_blank\">Pubmed</strong></td>";
    row += "<td>" + dataAtI.description + "</td>";
    row += "<td>" + dataAtI.study_type + "</td>";
    row += "<td>" + dataAtI.size + "</td>";
    row += "<td>" + dataAtI.author + "</td>";
    row += "<td>" + dataAtI.reference + "</td></tr>";
    table += row;
    return table;
}

function addToExistingRegionElement(allDataDictAtI, dataAtI) {
    var row = "<tr><td style='text-decoration: underline'><strong><a href=" + dataAtI.link + " target=\"_blank\">Summary</strong></td>";
    row += "<td style='text-decoration: underline'><strong><a href=" + dataAtI.link + " target=\"_blank\">Pubmed</strong></td>";
    row += "<td>" + dataAtI.description + "</td>";
    row += "<td>" + dataAtI.study_type + "</td>";
    row += "<td>" + dataAtI.size + "</td>";
    row += "<td>" + dataAtI.author + "</td>";
    row += "<td>" + dataAtI.reference + "</td></tr>";
    allDataDictAtI += row;
    return allDataDictAtI;
}



// function getSortedData(data, subject) {
//     // Creating a table of links to html ids
//     // For each id, create a div with a sticky header and a table of data
//     // For each study, create a link to open a new tab
//     var uniqueCategories = [];
//     var studiesTable = []
//     var categoryTable = "<table>";
//     var elementsTable = "<div><h1>";
//
//     for (let i = 0; i < data.length; i++) {
//         // Create list of regions in subject
//         if (data[i].subject == subject) {
//             if (uniqueCategories.includes(data[i].region, 0) == false){
//                 uniqueCategories.push(data[i].region);
//                 // Add region as sticky header to table
//                 studiesTable.push(getStudyData(data[i].region));
//             }
//             else {
//                 studiesTable.push(getStudyData(data[i].region));
//             }
//             // Going to add all data as hyperlink to id element
//             // Define sticky header as id using return function
//         }
//     }
//     uniqueCategories.sort();
//
//     for (let i = 0; i < uniqueCategories.length; i++) {
//         var row = "<td><strong><a href=#" + i + ">" + uniqueCategories[i] + "</strong></td>";
//         table += row + "</tr>";
//     }
//
//     return(table + "</table>");
//
//
// }

function getStudyData(region) {
    // Adds region and study data to table
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