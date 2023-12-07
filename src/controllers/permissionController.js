// src/controllers/permissionController.js
import { revokePermission, invokePermission } from '../services/permissionService.js';

const permissionController = {
// Example routes using Express
 revokePermissionRoute : async (req, res) => {
    const { roleName, permissionName } = req.body;
    await revokePermission(roleName, permissionName);
    res.send('Permission revoked');
  },
  
  invokePermissionRoute : async (req, res) => {
    // console.log( req.body); return false;
    const { roleName, permissionName } = req.body;
    await invokePermission(roleName, permissionName);
    res.send('Permission invoked');
  }
  
};

export { permissionController };
