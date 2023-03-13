import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (10, 'ADMIN_NAV.DASHBOARD', '/admin', null, 'dashboard', null, false, 0),
    new Menu (20, 'ADMIN_NAV.MENU_ITEMS', null, null, 'grid_on', null, true, 0),  
    new Menu (21, 'ADMIN_NAV.CATEGORIES', '/admin/menu-items/categories', null, 'category', null, false, 20), 
    new Menu (22, 'ADMIN_NAV.MENU_ITEMS_LIST', '/admin/menu-items/list', null, 'list', null, false, 20), 
    new Menu (23, 'ADMIN_NAV.MENU_ITEM_DETAIL', '/admin/menu-items/detail', null, 'remove_red_eye', null, false, 20),  
    new Menu (24, 'ADMIN_NAV.ADD_MENU_ITEM', '/admin/menu-items/add', null, 'add_circle_outline', null, false, 20), 
    new Menu (30, 'ADMIN_NAV.SALES', null, null, 'monetization_on', null, true, 0),  
    new Menu (31, 'ADMIN_NAV.ORDERS', '/admin/sales/orders', null, 'list_alt', null, false, 30), 
    new Menu (32, 'ADMIN_NAV.TRANSACTIONS', '/admin/sales/transactions', null, 'local_atm', null, false, 30),  
    new Menu (40, 'ADMIN_NAV.USERS', '/admin/users', null, 'group_add', null, false, 0), 
    new Menu (45, 'ADMIN_NAV.RESERVATIONS', '/admin/reservations', null, 'event', null, false, 0),  
    new Menu (50, 'ADMIN_NAV.CUSTOMERS', '/admin/customers', null, 'supervisor_account', null, false, 0),  
    new Menu (60, 'ADMIN_NAV.COUPONS', '/admin/coupons', null, 'card_giftcard', null, false, 0),  
    new Menu (70, 'ADMIN_NAV.WITHDRAWAL', '/admin/withdrawal', null, 'credit_card', null, false, 0), 
    new Menu (80, 'ADMIN_NAV.ANALYTICS', '/admin/analytics', null, 'multiline_chart', null, false, 0), 
    new Menu (90, 'ADMIN_NAV.REFUND', '/admin/refund', null, 'restore', null, false, 0),  
    new Menu (100, 'ADMIN_NAV.FOLLOWERS', '/admin/followers', null, 'follow_the_signs', null, false, 0), 
    new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0), 
    new Menu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0), 
    new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    new Menu (144, 'Level 5', null, '/', 'link', null, false, 143),
    new Menu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]