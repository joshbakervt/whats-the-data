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
        if(Object.values(data[i].summary) === "N/A") {
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
            "<table class='table' id='" + (contentID.toString() + "summary") + "'>\
                <tr>\
                    <td>\
                        <h4 class='pull-left summaryTable' style='text-align: left'><strong>" +
                            Object.values(data[i].author) + ", " + Object.values(data[i].reference) + " (" + longFormStudyType + ", n=" +
                            Object.values(data[i].size) + ")"
                            + "</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td>\
                        <h3 style='text-align: center'><strong>Summary</strong></h3>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'><strong>" + summary + "</strong></td>\
                </tr>\
                \<tr>\
                    <td class='preline' style='text-align: left'><strong><br></strong></td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4  style='text-align: center'><strong>Inclusion Criteria</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>" + Object.values(data[i].inclusion) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4  style='text-align: center'><strong>Exclusion Criteria</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>" + Object.values(data[i].exclusion) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4  style='text-align: center'><strong>Design/Intervention</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>" + Object.values(data[i].design_intervention) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4 style='text-align: center'><strong>Follow Up</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>" + Object.values(data[i].follow_up) + "</td>\
                </tr>\
                <tr>\
                    <td>\
                        <h4 style='text-align: center'><strong>Results</strong></h4>\
                    </td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>" + Object.values(data[i].results) + "</td>\
                </tr>\
                \<tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>&nbsp</td>\
                </tr>\
                <tr>\
                    <td class='preline pull-left summaryTable' style='text-align: left'>&nbsp</td>\
                </tr>\
            </table></td></tr>");

        let pubmedLink = Object.values(data[i].link).toString();
        let editedLink = pubmedLink.replace(/\D/g,'');
        studiesAsHTML = (
            // "<tr><td style='text-decoration: underline'><strong><a href=" + data[i].link + " target=\"_blank\">Summary</strong></td> \
            "<tr><td><button data-toggle='collapse' data-target='#" + (contentID.toString() + "collapse") + "' title='Expand'>Summary</button></td> \
            <td><button onclick='openSummary(\"" + (contentID.toString() + "summary") + "\")'><span class='glyphicon glyphicon-new-window' title='Open summary in a new tab' style='color: var(--primary)'></span></button></td>\
            <td><strong><button style='color: var(--primary)' onclick='openPubmed(\"" + editedLink + "\")'>Pubmed</strong></td>\
            <td>" + Object.values(data[i].description) + "</td>\
            <td class='hidden-xs'>" + longFormStudyType + "</td>\
            <td class='hidden-xs'> n=" + Object.values(data[i].size) + "</td>\
            <td class='hidden-sm hidden-xs'>" + Object.values(data[i].author) + "</td>\
            <td class='hidden-md hidden-sm hidden-xs'>" + Object.values(data[i].reference) + "</td></tr>" + summaryAsHTML);
        studyDataMap.set(strippedRegion, (studyDataMap.get(strippedRegion) + studiesAsHTML));
        contentID += 1;
        // For each element in studyDataHTML, don't forget to add a table
    }
    var regionLinksTable = "<div class='container regionLinks'><table class='table table-hover'>";
    for(const [key, value] of regionLinks) {
        regionLinksTable += value;
    }
    regionLinksTable += "</table class='table' id='regionData'> </div>";
    regionLinksTable += "<div class=container hidden-md hidden-lg><p><br>&nbsp &nbsp</p></div>"

    var studyDataTable = "<table class='table table-hover table-responsive'>";
    for(const [key, value] of studyDataMap) {
        studyDataTable += value;
    }
    studyDataTable += "</table>";

    return (regionLinksTable + studyDataTable);
}

// <td><button onclick=\"openSummary(" + summaryAsHTML + ")\"><span class='glyphicon glyphicon-new-window'></span></button></td>\
function getResources(data) {
    return data.length;
}

function openPubmed(value) {
    let pubmedLink = "https://pubmed.ncbi.nlm.nih.gov/";
    let link = pubmedLink.concat("", value);
    window.open(link, '_blank');
}

function openSummary(id) {
    console.log(id);
    let text = document.getElementById(id).innerHTML;
    console.log(text);
    var summaryWindow = window.open('summary.html', '_blank');
    summaryWindow.document.write(
        "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <title>What's The Data?</title>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"index.css\">\n" +
        "    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\n" +
        "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js\"></script>\n" +
        "    <script src=\"index.js\"></script>\n" +
        "\n" +
        "</head>\n" +
        "<body>\n" +
        "\n" +
        "<div class=\"container\">\n" +
        "    <div>\n" +
        "        <table id=\"summaryContent\">\n" +
        text +
        "        </table>\n" +
        "    </div>\n" +
        "</div>\n" +
        "\n" +
        "</body>\n" +
        "</html>"
    );
}