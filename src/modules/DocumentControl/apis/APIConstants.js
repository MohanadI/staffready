export const APIS = {
    TREE:{
        SUBJECTS_ONLY: "tree/subjects",
        SUBJECTS: "tree/subject/documents",
        CLASSIFICATIONS: "tree/classification/documents",
        LOCATIONS: "tree/location/documents"
    },
    COLOR_BAR:{
        SUBJECTS: {
            GET_SUBJECT: (ID) => "subject/" + ID,
            GET_SUBJECT_DOCUMENT: (ID) => "subject/" + ID +"/documents"
        },
        STATUS: {
            SUBJECT: (ID) => "documentcontrol/colorbar/subject/" + ID,
            SUBJECT_DOCUMENT: (ID) => "documentcontrol/colorbar/subjectDocuments/" + ID
        }
    }

}