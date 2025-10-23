/* eslint-disabled */

export default class DeviceExtend {

    public type? = '';
    public deviceName? = '';
    public createdAt?: Date;
    public lastActivity?: Date;


    constructor(object?: any) {
        if (object) {
            this.deviceName = object.deviceName
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.lastActivity) {
                this.lastActivity = new Date(object.lastActivity);
            }
        }
    }


    get icon() {
        switch (this.type) {
            case 'smartphone':
                return 'fad fa-mobile-alt'
                break;
            default:
                return 'fad fa-desktop'
                break;
        }


    }

}
