import { Menu } from './menu.model'; 

export const menuItems = [ 

    new Menu (20, 'ADMIN_NAV.MENU_ITEMS', null, null, 'grid_on', null, true, 0),  
    new Menu (21, 'ADMIN_NAV.CATEGORIES', '/adminside/meal-items/categories', null, 'category', null, false, 20), 
    new Menu (22, 'ADMIN_NAV.MENU_ITEMS_LIST', '/adminside/meal-items/list', null, 'list', null, false, 20), 
    new Menu (23, 'ADMIN_NAV.MENU_ITEM_DETAIL', '/adminside/meal-items/detail', null, 'remove_red_eye', null, false, 20),  
    new Menu (24, 'ADMIN_NAV.ADD_MENU_ITEM', '/adminside/meal-items/add', null, 'add_circle_outline', null, false, 20), 
    
    new Menu (40, 'ADMIN_NAV.USERS', '/adminside/users', null, 'group_add', null, false, 0), 

    new Menu (120, 'ADMIN_NAV.REVIEWS', '/adminside/reviews', null, 'insert_comment', null, false, 0), 

]