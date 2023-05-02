import axios from "axios";
import { APIS } from "./APIConstants";

const MAIN_URL = "/StaffReady/v10/api/"
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

export const get_subject_data = async (ID) => {
    let res = null;

    await axios
        .get(MAIN_URL + APIS.COLOR_BAR.SUBJECTS.GET_SUBJECT(ID))
        .then(data => res = data)
        .catch(error => console.log(error));

    return res?.data;
}

export const get_subjects_tree = async () => {
    let res = null;

    await axios
        .get(MAIN_URL + APIS.TREE.SUBJECTS_ONLY)
        .then(data => res = data)
        .catch(error => console.log(error));

    return res?.data;
}

export const get_subject_document_data = async (ID) => {
    let res = null;

    await axios
        .get(MAIN_URL + APIS.COLOR_BAR.SUBJECTS.GET_SUBJECT_DOCUMENT(ID))
        .then(data => res = data)
        .catch(error => console.log(error));

    return res?.data;
}

export const get_color_bar_status = async (url) => {
    let res = null;

    await axios
        .get(MAIN_URL + url)
        .then(data => res = data)
        .catch(error => console.log(error));

    return res?.data?.color || "OK";
}