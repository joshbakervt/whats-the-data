// STUDYDATAMAP
// region : studies as html

// REGIONMAP
// region : region as html link



function retrieveAllData(data, subject) {
    let regionLinks = new Map();
    let studyDataMap = new Map();
    var strippedRegion;
    var currentID = 0;
    var finalReturnData;
    var studiesAsHTML;
    // Iterate through all of data
    for (let i = 0; i < data.length; i++) {
        // If subject match
        if (data[i].subject == subject) {
            strippedRegion = data[i].region.replace(/\s/g, '');
            // If region does not exist in regionMap
            if(!regionLinks.has(strippedRegion)) {
                // Add the region as href to regionMap
                regionLinks.set(strippedRegion, ("<tr><td><a href='#" + currentID + "'>" + data[i].region + "</a></td></tr>"));
                // Add h1 to studyDataMap
                studyDataMap.set(strippedRegion, ("<tr class='regionHeader'><td colspan='7'><h2 id='" + currentID +"'>" + data[i].region + "</h2></td></tr>"));
                currentID += 1;
            }
            // Add the study data in rows
            studiesAsHTML = (
            "<tr><td style='text-decoration: underline'><strong><a href=" + data[i].link + " target=\"_blank\">Summary</strong></td> \
            <td style='text-decoration: underline'><strong><a href=" + data[i].link + " target=\"_blank\">Pubmed</strong></td>\
            <td>" + data[i].description + "</td>\
            <td>" + data[i].study_type + "</td>\
            <td>" + data[i].size + "</td>\
            <td>" + data[i].author + "</td>\
            <td>" + data[i].reference + "</td></tr>");

            studyDataMap.set(strippedRegion, (studyDataMap.get(strippedRegion) + studiesAsHTML));
            // For each element in studyDataHTML, don't forget to add a table
        }
    }
    var regionLinksTable = "<table>";
    for(const [key, value] of regionLinks) {
        regionLinksTable += value;
    }
    regionLinksTable += "</table>";

    var studyDataTable = "<table>";
    // for(let k = 0; k < studyDataMap.size; k++) {
    //     console.log(studyDataMap[k].value);
    //     studyDataTable += studyDataMap[k].value();
    // }
    for(const [key, value] of studyDataMap) {
        studyDataTable += value;
    }
    console.log(studyDataTable);
    studyDataTable += "</table>";

    return (regionLinksTable + studyDataTable);

}