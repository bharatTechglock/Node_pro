import {
    Role,
    Permission
} from "../models/index.js";

const findRoleByName = async (roleName) => {
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
const findPermissionByName = async (permissionName) => {
    try {
        const permission = await Permission.findOne({
            where: {
                name: permissionName
            }
        });
        return permission;
    } catch (error) {
        console.error(`Error finding permission by name '${permissionName}':`, error);
        throw error;
    }
};

export {
    findRoleByName,
    findPermissionByName
};