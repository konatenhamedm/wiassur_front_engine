/* eslint-disable  @typescript-eslint/no-explicit-any */
import store from "@/store";

export default class Popup {
    public id = '';
    public title? = '';
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

    constructor(title = '', message: string, color = 'secondary', icon = 'fad fa-exclamation', keepAlive = false,
                link ?: string, buttons?: []) {
        this.uuid = this.generateId();
        this.title = title;
        this.content = message;
        this.keepAlive = keepAlive;
        if (icon)
            this.photo = icon;
        if (link)
            this.url = link;
        if (buttons) {
            this.buttons = buttons;
        }

        this.color = color
        const match = store.state.popups.find((p: Popup) => {
            return p.title!.toLowerCase() === title.toLowerCase() && p.content!.toLowerCase() === message
        })
        if (match) {
            store.commit('removeNotificationPopup', match.uuid);
        }
        store.commit('pushNotificationPopup', this);
        if (!keepAlive) {
            this.timeout = setTimeout(() => {
                store.commit('removeNotificationPopup', this.uuid);
                clearTimeout(this.timeout);
            }, 15000);
        }

        return this;
    }

    hide() {
        store.commit('removeNotificationPopup', this.uuid);
        clearTimeout(this.timeout);
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

    generateId(): string {
        const number = Math.random();
        number.toString(36);
        return number.toString(36).substr(2, 9);
    }
}
