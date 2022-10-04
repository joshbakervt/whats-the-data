// STUDYDATAMAP
// region : studies as html

// REGIONMAP
// region : region as html link



function retrieveAllData(data, subject) {
    let regionLinks = new Map();
    let studyDataMap = new Map();
    var strippedRegion;
    var currentID = 0;
    var contentID = 1;
    var summary;
    var studiesAsHTML;

    const longForm = {
        "PC": "Prospective Cohort",
        "RC": "Retrospective Cohort",
        "MA": "Meta-Analysis",
        "CS": "Case Series",
        "EO": "Expert Opinion",
        "CR": "Case Report",
        "BS": "Biomechanical Study",
        "OP": "Opinion Piece",
        "SC": "Basic Science",
        "RCT": "RCT"
    }
    var longFormStudyType;
    // Iterate through all of data
    for (let i = 0; i < data.length; i++) {
        // If subject match
        if (data[i].subject == subject) {
            strippedRegion = data[i].region.replace(/\s/g, '');
            // If region does not exist in regionMap
            if(!regionLinks.has(strippedRegion)) {
                // Add the region as href to regionMap
                regionLinks.set(strippedRegion, ("<tr><td><h4><a href='#" + currentID + "'>" + data[i].region + "</a></h4></td></tr>"));
                // Add h1 to studyDataMap
                studyDataMap.set(strippedRegion, ("<tr><th class='regionHeader' colspan='7'><h2 id='" + currentID +"'>" + data[i].region + "</h2</th></tr>"));
                currentID += 1;
            }
            if(data[i].summary == "N/A") {
                summary = "No summary found for this study";
            }
            else {
                summary = data[i].summary;
            }
            try {
                longFormStudyType = longForm[data[i].study_type];
            } catch(err) {
                longFormStudyType = data[i].study_type;
            }
            // Add the study data in rows;
            studiesAsHTML = (
            // "<tr><td style='text-decoration: underline'><strong><a href=" + data[i].link + " target=\"_blank\">Summary</strong></td> \
            "<tr><td><button data-toggle='collapse' data-target='#" + (contentID.toString() + "collapse") + "'>Summary</button></td> \
            <td style='text-decoration: underline'><strong><a href=" + data[i].link + " target=\"_blank\">Pubmed</strong></td>\
            <td>" + data[i].description + "</td>\
            <td>" + longFormStudyType + "</td>\
            <td> n=" + data[i].size + "</td>\
            <td>" + data[i].author + "</td>\
            <td>" + data[i].reference + "</td></tr> \
            <tr id='" + (contentID.toString() + "collapse") + "'class='collapse'><td colspan='7'>" +
                "<table>\
                    <tr>\
                        <td>\
                            <h4 class='pull-left' style='text-align: left'><strong>" +
                            data[i].author + ", " + data[i].reference + "<br>(" + longFormStudyType + ", " +
                            data[i].size + ", rank=" + data[i].rank + ")"
                            + "</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>\
                            <h4><strong>Summary</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>" + summary + "</td>\
                    </tr>\
                    <tr>\
                        <td>\
                            <h4><strong>Inclusion Criteria</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>" + data[i].inclusion + "</td>\
                    </tr>\
                    <tr>\
                        <td>\
                            <h4><strong>Exclusion Criteria</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>" + data[i].exclusion + "</td>\
                    </tr>\
                    <tr>\
                        <td>\
                            <h4><strong>Design/Intervention</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>" + data[i].design_intervention + "</td>\
                    </tr>\
                    <tr>\
                        <td>\
                            <h4><strong>Follow Up</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>" + data[i].follow_up + "</td>\
                    </tr>\
                    <tr>\
                        <td>\
                            <h4><strong>Results</strong></h4>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td>" + data[i].results + "</td>\
                    </tr>\
                </table></td></tr>");
            studyDataMap.set(strippedRegion, (studyDataMap.get(strippedRegion) + studiesAsHTML));
            contentID += 1;
            // For each element in studyDataHTML, don't forget to add a table
        }
    }
    var regionLinksTable = "<table class='table table-hover'>";
    for(const [key, value] of regionLinks) {
        regionLinksTable += value;
    }
    regionLinksTable += "</table id='regionData'>";

    var studyDataTable = "<table class='table table-hover table-responsive'>";
    for(const [key, value] of studyDataMap) {
        studyDataTable += value;
    }
    studyDataTable += "</table>";

    return (regionLinksTable + studyDataTable);

}

function getResources(data) {
    return data.length;
}