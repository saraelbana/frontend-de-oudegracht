export const createRequestData = ({ firstname, lastname, email, username, password, phone, role }) => {
    return {

        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        phone: phone,
        role: role
    };
};
export const createUpdateRequestData = ({ firstname, lastname, email, username, phone, role }) => {
    return {

        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        phone: phone,
        role: role
    };
};

