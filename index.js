function displayData(data) {

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
        // var regionCurr = data[i].region;
        var strippedString = Object.values(data[i].region).toString();
        strippedRegion = strippedString.replace(/\s/g, '');
        // If region does not exist in regionMap
        if(!regionLinks.has(strippedRegion)) {
            // Add the region as href to regionMap
            regionLinks.set(strippedRegion, ("<tr><td><h4><a href='#" + currentID + "'>" + Object.values(data[i].region) + "</a></h4></td></tr>"));
            // Add h1 to studyDataMap
            studyDataMap.set(strippedRegion, ("<tr><th class='regionHeader' colspan='8'><h2 id='" + currentID +"'>" + Object.values(data[i].region) + "</h2</th></tr>"));
            currentID += 1;
        }
        if(Object.values(data[i].summary) == "N/A") {
            summary = "No summary found for this study";
        }
        else {
            summary = Object.values(data[i].summary);
        }
        try {
            longFormStudyType = longForm[Object.values(data[i].study_type)];
        } catch(err) {
            longFormStudyType = Object.values(data[i].study_type);
        }
        // Add the study data in rows;
        region = data[i].region;

        var summaryAsHTML = ("<tr id='" + (contentID.toString() + "collapse") + "'class='collapse'><td colspan='8'>" +
            "<table>\
                <tr>\
                    <td>\
                        <h4 class='pull-left' style='text-align: left'><strong>" +
                            Object.values(data[i].author) + ", " + Object.values(data[i].reference) + " (" + longFormStudyType + ", n=" +
                            Object.values(data[i].size) + ")"
                            + "</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4><strong>Summary</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'><strong>" + summary + "</strong></td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4><strong>Inclusion Criteria</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'>" + Object.values(data[i].inclusion) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4><strong>Exclusion Criteria</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'>" + Object.values(data[i].exclusion) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4><strong>Design/Intervention</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'>" + Object.values(data[i].design_intervention) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4 ><strong>Follow Up</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'>" + Object.values(data[i].follow_up) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4><strong>Results</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'>" + Object.values(data[i].results) + "</td>\
                </tr>\
                \<tr>\
                    <td class='preline' style='text-align: left'>&nbsp</td>\
                </tr>\
                <tr>\
                    <td class='preline' style='text-align: left'>&nbsp</td>\
                </tr>\
            </table></td></tr>");

        studiesAsHTML = (
            // "<tr><td style='text-decoration: underline'><strong><a href=" + data[i].link + " target=\"_blank\">Summary</strong></td> \
            "<tr><td><button data-toggle='collapse' data-target='#" + (contentID.toString() + "collapse") + "'>Summary</button></td> \
            <td><a href='summary.php?allData=1234' target='_blank'><span class='glyphicon glyphicon-new-window'></span></a></td>\
            <td style='text-decoration: underline'><strong><a href=" + Object.values(data[i].link) + " target=\"_blank\">Pubmed</strong></td>\
            <td>" + Object.values(data[i].description) + "</td>\
            <td>" + longFormStudyType + "</td>\
            <td> n=" + Object.values(data[i].size) + "</td>\
            <td>" + Object.values(data[i].author) + "</td>\
            <td>" + Object.values(data[i].reference) + "</td></tr>" + summaryAsHTML);
        studyDataMap.set(strippedRegion, (studyDataMap.get(strippedRegion) + studiesAsHTML));
        contentID += 1;
        // For each element in studyDataHTML, don't forget to add a table
    }
    var regionLinksTable = "<div class='container regionLinks'><table class='table table-hover'>";
    for(const [key, value] of regionLinks) {
        regionLinksTable += value;
    }
    regionLinksTable += "</table id='regionData'> </div>";

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