import {
    Role,
    Permission
} from "../models/index.js";

const findRoleByName = async (roleName) => {
    // console.log( 'sdss',roleNames); return false;

    try {
        const role = await Role.findOne({
            where: {
                name: roleName
            }
        });
        return role;
    } catch (error) {
        console.error(`Error finding role by name '${roleName}':`, error);
        throw error;
    }
};

export {
    findRoleByName
};