export class Menu {
    constructor(public id: number = 0,
                public title: string = '',
                public routerLink: string | null,
                public href: string | null,
                public icon: string | null,
                public target: string | null,
                public hasSubMenu: boolean = false,
                public parentId: number = 0) { }
} 