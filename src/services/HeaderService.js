import { execute } from '../db/QueryWrapperMysql.js';

export const HeaderService = {
    getHeaderMenu: async function (id = null){
        let query  =  'SELECT * FROM dashboard_tbl %WHERE%';       
        try {
            let condition = id ? `WHERE menuid = ?` : "";
            query = query.replace(/%WHERE%/g, condition);
            let queryBindingOptions = id ? [id]: [];
            const result = await execute(query , queryBindingOptions);
            return result;
        }catch (error) {
            console.error(error);
            return { success: false , error: error.message };
        }
    },
    insertHeaderMenus: async function(payload) {
        const {data} = payload;
        let result = null;
        try {
            result = await execute("INSERT INTO dashboard_tbl (menu_heading, menu_name, menu_under, enable_yn) VALUES ? ", [data]);
            result = {status: true, message: " Data inserted successfully"}
        } catch (error) {
            console.log(error);
            result = { success: false , error: error.message };
        }finally{
                return result;
        }
    },
    updateHeaderMenu: async function(payload){
        const {id, ...dataToSet} = payload;
        let result;
        try {
            // const 
            result =  await execute("UPDATE dashboard_tbl SET ? WHERE menuid = ?", [dataToSet, id])
        } catch (error) {
            console.log(error);
            return { success: false , error: error.message };
        } finally {
            if (result.status === 200) {
                return {status: success, message: " Data updated successfully"};
            }
        }
    },
    deleteHeaderMenu: async function (id){
        const MenuItems = await this.getHeaderMenu();
        let menuName ;

        MenuItems.forEach((item) => {
            if (item.menuid === Number(id.menuid)) {
                menuName = item.menu_name;
            }
        })

        const dataToDelete = [];
        MenuItems.forEach((item) => {
            if (item.menu_name === menuName || item.menu_under === menuName ) {
                dataToDelete.push(item.menuid);
            }
        });

        let result;
        try {
            // const 
            result =  await execute("DELETE FROM dashboard_tbl WHERE menuid IN (?)", [dataToDelete]);
            result = {status: true, message: " Data deleted successfully"};
        } catch (error) {
            console.log(error);
            result =  { success: false , error: error.message };
        } finally {
           return result
        }
    }
}