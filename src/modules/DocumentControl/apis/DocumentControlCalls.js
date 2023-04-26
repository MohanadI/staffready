import axios from "axios";
import { APIS } from "./APIConstants";

const MAIN_URL = "https://cobalt301.openstack.local/StaffReady/v10/api/"
export const get_document_tree = async (type) => {
    let res = null;
    let api = "";
    if (type === "subject"){
        api = MAIN_URL + APIS.TREE.SUBJECTS;
    } else if (type === "classification"){
        api = MAIN_URL + APIS.TREE.CLASSIFICATIONS;
    } else{
        api = MAIN_URL + APIS.TREE.LOCATIONS;
    }
    await axios
        .get(api)
        .then(data => res = data)
        .catch(error => console.log(error));

    return res;
}

export const get_subject = (ID) => {
    return APIS.COLOR_BAR.SUBJECTS.GET_SUBJECT(ID);
}