export const coupons = [
    { 
        id: 1, 
        title: '10% Off',
        code: '2491', 
        desc: 'lorem ipsum', 
        discountType: 1,
        amount: 10,
        expiryDate: new Date(2020,11,15),
        allowFreeShipping: false,
        storeId: 1,
        showOnStore: false,
        restriction: {
            minimumSpend: 10,
            maximumSpend: 30,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: ["Beef Languet With Potato", "Onion Soup"],
            categories: [4, 5]
        },
        limit: {
            perCoupon: 1,
            perItems: 1,
            perUser: 1
        }
    },
    { 
        id: 2, 
        title: '20% Off',
        code: '3274', 
        desc: 'lorem ipsum', 
        discountType: 2,
        amount: 20,
        expiryDate: new Date(2020,8,5),
        allowFreeShipping: false,
        storeId: 2,
        showOnStore: false,
        restriction: {
            minimumSpend: 20,
            maximumSpend: 50,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: ['Noodle Soup With Meatballs'],
            categories: [4]
        },
        limit: {
            perCoupon: 3,
            perItems: 1,
            perUser: 1
        }
    }, 
    { 
        id: 3, 
        title: '10% Off',
        code: '5247', 
        desc: 'lorem ipsum', 
        discountType: 3,
        amount: 10,
        expiryDate: new Date(2021,11,25),
        allowFreeShipping: false,
        storeId: 1,
        showOnStore: false,
        restriction: {
            minimumSpend: 10,
            maximumSpend: 50,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: [],
            categories: []
        },
        limit: {
            perCoupon: 1,
            perItems: 1,
            perUser: 1
        }
    }, 
    { 
        id: 4, 
        title: '10% Off',
        code: '9585', 
        desc: 'lorem ipsum', 
        discountType: 2,
        amount: 10,
        expiryDate: new Date(2020,4,22),
        allowFreeShipping: false,
        storeId: 1,
        showOnStore: false,
        restriction: {
            minimumSpend: 10,
            maximumSpend: 30,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: [],
            categories: []
        },
        limit: {
            perCoupon: 2,
            perItems: 1,
            perUser: 1
        }
    },
    { 
        id: 5, 
        title: '5% Off',
        code: '3258', 
        desc: 'lorem ipsum', 
        discountType: 2,
        amount: 30,
        expiryDate: new Date(2020,5,12),
        allowFreeShipping: false,
        storeId: 2,
        showOnStore: false,
        restriction: {
            minimumSpend: 5,
            maximumSpend: 30,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: [],
            categories: []
        },
        limit: {
            perCoupon: 4,
            perItems: 1,
            perUser: 1
        }
    },
    { 
        id: 6, 
        title: '25% Off',
        code: '7425', 
        desc: 'lorem ipsum', 
        discountType: 3,
        amount: 25,
        expiryDate: new Date(2020,3,29),
        allowFreeShipping: false,
        storeId: 1,
        showOnStore: false,
        restriction: {
            minimumSpend: 25,
            maximumSpend: 30,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: [],
            categories: []
        },
        limit: {
            perCoupon: 2,
            perItems: 1,
            perUser: 1
        }
    },
    { 
        id: 7, 
        title: '15% Off',
        code: '5688', 
        desc: 'lorem ipsum', 
        discountType: 1,
        amount: 20,
        expiryDate: new Date(2020,12,24),
        allowFreeShipping: false,
        storeId: 2,
        showOnStore: false,
        restriction: {
            minimumSpend: 15,
            maximumSpend: 30,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: [],
            categories: []
        },
        limit: {
            perCoupon: 6,
            perItems: 1,
            perUser: 1
        }
    },
    { 
        id: 8, 
        title: '10% Off',
        code: '5962', 
        desc: 'lorem ipsum', 
        discountType: 1,
        amount: 30,
        expiryDate: new Date(2020,8,12),
        allowFreeShipping: false,
        storeId: 2,
        showOnStore: false,
        restriction: {
            minimumSpend: 10,
            maximumSpend: 30,
            individualUseOnly: true,
            excludeSaleItems: false,
            menuItems: [],
            categories: []
        },
        limit: {
            perCoupon: 3,
            perItems: 1,
            perUser: 1
        }
    }
]