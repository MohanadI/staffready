export const APIS = {
    TREE:{
        SUBJECTS: "tree/subject/documents",
        CLASSIFICATIONS: "tree/classification/documents",
        LOCATIONS: "tree/location/documents"
    },
    COLOR_BAR:{
        SUBJECTS: {
            GET_SUBJECT: (ID) => "subject/" + ID
        },
        STATUS: {
            SUBJECT: (ID) => "documentcontrol/colorbar/subject/" + ID,
            SUBJECT_DOCUMENT: (ID) => "documentcontrol/colorbar/subjectDocuments/" + ID
        }
    }

}