

function retrieveAllData(data, subject) {
    // Define all variables
    // joinedDataAsHTML is what we will output, ultimately two tables: one table of links to rows in the other
    var joinedDataAsHTML;
    // regionLinksAsHTML is the first table, which contains all the regions linked to the header in the data table
    var regionLinksAsHTML;
    // allStudyDataAsHTML is the second table, which contains the study info
    var allStudyDataAsHTML;
    // Two maps: one of the regions paired to their HTML id values
    let regionIdDict = new Map();
    // ... and another for mapping HTML id values to the HTML table of all data within that region
    let allDataAsTableDict = new Map();
    // A running iterator for assigning HTML id values to each region of study
    var currentID = 0;



    // Run through data
    for(let i = 0; i < data.length; i++) {
        // Only outputting data of our subject instance (i.e. Cerebrovascular, Tumor, etc.)
        if(data[i].subject == subject) {
            // If the region exists in regionIdDict, then it is already in regionLinksAsHTML
            if(regionIdDict.has(data[i].region)) {
                // So all we have to do is add it to allStudyDataAsHTML and allDataAsTableDict
                //////////////////////////// FINISH THIS ///////////////////////////////////
            }
            // If not, then we need to add it to both tables
            else {
                // Assign an HTML id to the region of study
                regionIdDict.set(data[i].region, currentID);
                // And add both the key and value pairs to regionLinksAsHTML

            }
        }
    }


    return allDataAsHTML;
}

function addRegionLink(allRegionLinks, currentRegion, currentRegionID) {

    return allRegionLinks;
}

function addFirstRegionTableElement(regionID, dataAtI) {
    var table = "<table>";

    return table;
}

function addToExistingRegionTableElement(regionTableElement, dataAtI) {

    return regionTableElement;
}