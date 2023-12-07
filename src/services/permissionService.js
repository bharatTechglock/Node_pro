// src/services/permissionService.js
import { Permission } from '../models/index.js';
import { findRoleByName } from './roleService.js'; 

const revokePermission = async (roleName, permissionName) => {
  const role = await findRoleByName(roleName);
  const permission = await Permission.findOne({ where: { name: permissionName } });

  if (role && permission) {
    await role.removePermission(permission);
    console.log(`Permission '${permissionName}' revoked from role '${roleName}'`);
  } else {
    console.log(`Role '${roleName}' or Permission '${permissionName}' not found`);
  }
};

const invokePermission = async (roleName, permissionName) => {
  const role = await findRoleByName(roleName);
//   console.log( role); return false;

  const permission = await Permission.findOne({ where: { name: permissionName } });
//   console.log( permission); return false;

  if (role && permission) {
    await role.addPermission(permission);
//   console.log( permission); return false;

    console.log(`Permission '${permissionName}' invoked for role '${roleName}'`);
  } else {
    console.log(`Role '${roleName}' or Permission '${permissionName}' not found`);
  }
};

export { revokePermission, invokePermission };
