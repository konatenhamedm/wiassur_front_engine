/* eslint-disabled */

import Popup from "@/entity/Popup";

export default class EnterpriseExtend {
    public label = '';
    public rccm = '';
    public activity = '';

    constructor(object?: any) {
    }

    isIdentified() {
        return !this.empty(this.label) && !this.empty(this.rccm) && !this.empty(this.activity)
    }

    validate(){
        console.log('validate enterprise')
        if(this.empty(this.label)){
            new Popup('Information manquante','Veuillez renseigner le nom de l\'entreprise')
            return false;
        }
        if(this.empty(this.rccm)){
            new Popup('Information manquante','Veuillez renseigner le numéro RCCM')
            return false;
        }
        if(this.empty(this.activity)){
            new Popup('Information manquante','Veuillez renseigner le secteur d\'activité')
            return false;
        }
        console.log('valid')
        return true
    }

    empty(data: string | undefined): boolean {
        return data === null || data === undefined || data.length === 0
    }
}
