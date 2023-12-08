// src/controllers/permissionController.js
import { revokePermission, invokePermission } from '../services/permissionService.js';

const permissionController = {
  /**
   * This method is used to revoke permission
   * @param {*} req 
   * @param {*} res 
   */
 revokePermissionRoute : async (req, res) => {
    const { roleName, permissionName } = req.body;
    await revokePermission(roleName, permissionName);
    res.send('Permission revoked');
  },
  /**
   * This method is used to invoke permission
   * @param {*} req 
   * @param {*} res 
   */
  invokePermissionRoute : async (req, res) => {
    const { roleName, permissionName,userId } = req.body;
    await invokePermission(roleName, permissionName,userId);
    res.send('Permission invoked');
  }
  
};

export { permissionController };
