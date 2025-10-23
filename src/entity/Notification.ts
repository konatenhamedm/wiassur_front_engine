/* eslint-disabled */
import NotificationExtend from "@/entity/extends/NotificationExtend";
import store from "@/store";
import Popup from "@/entity/Popup";

export default class Notification extends NotificationExtend {

    public id = '';
    public title? = '';
    public subtitle? = '';
    public content? = '';
    public photo? = '';
    public data? = '';
    public url? = '';
    public category? = '';
    public channels = [];
    public readedBy? = '';
    public route? = '';
    public buttons? = [];
    public target = '';
    public type = '';
    public status = '';
    public uuid = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public createBy? = '';
    public timeout: any = null
    public keepAlive = false
    public color = 'white'

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.title = object.title;
            this.subtitle = object.subtitle;
            this.content = object.content;
            this.photo = object.photo;
            this.data = object.data;
            this.url = object.url;
            this.keepAlive = object.keepAlive
            this.category = object.category;
            this.channels = object.channels;
            this.readedBy = object.readedBy;
            if (typeof object.route === 'string') {
                this.route = JSON.parse(object.route);
            } else {
                this.route = object.route;

            }
            this.buttons = object.buttons;
            this.target = object.target;
            this.type = object.type;
            this.status = object.status;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            this.createBy = object.createBy;

            store.commit('pushNotification', this);
            if (!object.id) {
                store.commit('pushNotificationPopup', this);
            }
            this.timeout = setTimeout(() => {
                store.commit('removeNotificationPopup', this.uuid);
                clearTimeout(this.timeout);
            }, 30000);
        }
        this.postConstruct()

    }

    stopTimeout() {
        clearTimeout(this.timeout)
    }

    configureTimeout() {
        this.timeout = setTimeout(() => {
            store.commit('removeNotificationPopup', this.uuid);
            clearTimeout(this.timeout);
        }, 15000);
    }

    hide() {
        store.commit('removeNotificationPopup',this.uuid)
        clearTimeout(this.timeout)
    }

    // showPopup(){
    //     const occ = new Popup(this.title,this.content,'translucent',this.photo)
    // }

}


