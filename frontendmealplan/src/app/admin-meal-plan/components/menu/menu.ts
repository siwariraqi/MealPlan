import { Menu } from './menu.model'; 

export const menuItems = [ 

    new Menu (20, 'Meals', null, null, 'grid_on', null, true, 0),  
    new Menu (22, 'Meal List', '/adminside/meal-items/list', null, 'list', null, false, 20), 
    new Menu (24, 'Add Meal Item', '/adminside/meal-items/add', null, 'add_circle_outline', null, false, 20), 
    new Menu (40, 'Users', '/adminside/users', null, 'group_add', null, false, 0), 
    new Menu (120, 'Feedbacks', '/adminside/reviews', null, 'insert_comment', null, false, 0), 

]