// src/services/permissionService.js
import {
  Permission
} from '../models/index.js';
import {
  findRoleByName,
  findPermissionByName
} from './roleService.js';

const revokePermission = async (roleName, permissionName) => {
  const role = await findRoleByName(roleName);
  const permission = await findPermissionByName(permissionName);

  if (role && permission) {
    await role.removePermission(permission);
    console.log(`Permission '${permissionName}' revoked from role '${roleName}'`);
  } else {
    console.log(`Role '${roleName}' or Permission '${permissionName}' not found`);
  }
};

const invokePermission = async (roleName, permissionName,userId) => {
  const role = await findRoleByName(roleName);
  const permission = await findPermissionByName(permissionName);

  if (role && permission) {
    await role.addPermission(permission,userId);
    console.log(`Permission '${permissionName}' invoked for role '${roleName}'`);
  } else {
    console.log(`Role '${roleName}' or Permission '${permissionName}' not found`);
  }
};

export {
  revokePermission,
  invokePermission
};