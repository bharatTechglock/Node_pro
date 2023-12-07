import {
    Permission,
    Role_has_permission
} from '../models/index.js';
const checkPermission = (roleId, permName) => {

    Permission.findOne({
        where: {
            name: permName
        }
    }).then((perm) => {
        Role_has_permission.findOne({
            where: {
                role_id: roleId,
                permission_id: perm.id
            }
        }).then((rolePermission) => {
            console.log(rolePermission); 
            if (rolePermission) {
               return rolePermission;
            } else {
                // console.log(error);
            }
        }).catch((error) => {
            // console.log(error);
        });
    }).catch((error) => {
        // console.log(error);
    });
}

export {checkPermission}