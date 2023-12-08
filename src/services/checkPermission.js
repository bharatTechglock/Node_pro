
import { Role_has_permission } from "../models/index.js";
const checkPermission = async (roleId, requiredPermission) => {
    // console.log(roleId, requiredPermission); return false;

    const authUser = await Role_has_permission.findOne({
        where: {
            role_id: roleId,
            permission_id:requiredPermission
        }
    });

    return !!authUser;
};
export {checkPermission}