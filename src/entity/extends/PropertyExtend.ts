/* eslint-disabled */

import Property from "@/entity/Property";
import Item from "@/entity/Item";
import ItemType from "@/entity/ItemType";
import PropertyChoice from "@/entity/PropertyChoice";
import store from "@/store";
import ItemProperty from "@/entity/ItemProperty";
import {helper} from "@/services/Helper";
import ResponseGroup from "../ResponseGroup";

export default class PropertyExtend {

    public children: Array<Item> = [];
    public name = '';
    public visible = true
    ranking = null
    public newValue = null

    constructor(object?: any) {
        if (object) {

            this.name = object.name;
            this.newValue = object.value
            if (object.children) {
                object.children.forEach((occ: any) => {
                    const item = new Item(occ);
                    this.children.push(item);
                });
            }
            this.visible = object.visible
        }
    }

    postConstruct() {
        const self: Property = this as any
        if (self.model) {
            const m = store.state.itemProperties.find((i: ItemProperty) => {
                return i.id === self.model.id
            })
            if (m) {
                self.model = new ItemProperty(m)
            }
        }
        // console.log(store.state.itemProperties)
    }


    simplify(): any {
        const self: Property = this as any
        const simplified = {
            name: self.name,
            model: {
                id: self.model.id,
                name: self.model.name,
                code: self.model.code,
                uuid: self.model.uuid,
                link: self.model.link,
                type: self.model.type
            },
            value: self.value,
            children: [] as any,
        }
        this.children.forEach((c: Item) => {
            simplified.children.push(c.simplify())
        })
        return simplified
    }

    get formattedValue() {
        const self: Property = this as any
        if (self.model.type.format === 'DATE') {
            return helper.readable(new Date(self.value as any), ('dmY'))
        }
        if (self.model.type.code === 'AMOUNT' || self.model.type.code === 'NUMBER') {
            return helper.currencyFormat(self.value, false, false)
        }

        if (self.model.type.code === 'NUMBER') {
            return helper.currencyFormat(self.value, false, false)
        }

        if (self.model.type.code === 'RADIO') {
            const choice: PropertyChoice = self.model.choices.find((c: PropertyChoice) => {
                return c.code === self.value
            }) as any
            return choice?.label
        }
        if (self.model.type.code === 'BOOLEAN') {
            return self.value as any === true || self.value === 'true' ? 'Oui' : 'Non'
        }
        if (self.model.type.code === 'PACK') {
            const pack = JSON.parse(self.value as any)
            console.log(pack)
            return self.value as any === true || self.value === 'true' ? 'Oui' : 'Non'
        }
        // console.log(self.model.type.code)
        return self.value
    }

    isVisibleIn(items: Item[]) {
        const self: Property = this as any

        // if (self.model.type.code === 'PACK' || self.model.code === 'prime_ttc') {
        //     return false
        // }
        if (self.model.conditionGroups.length === 0) {
            return true;
        }
        // console.log('show ' + self.name + ' if ')

        let decision = null
        for (let group of self.model.conditionGroups) {
            let cg = true
            for (let condition of group.conditions) {
                const testing: Property = this.getPropertyInItems(condition.testingProperty.uuid, items)
                if (testing) {
                    // console.log(testing?.name + ' ' + condition.operator + ' "' + condition.value + '"')
                    const result = eval('"' + testing?.value + '" ' + condition.operator + ' "' + condition.value + '"')
                    // console.log('result is '+result)
                    cg = cg && result
                    // console.log('merge is '+cg)
                }
            }
            decision = decision === null ? cg : decision || cg
        }
        // console.log(self.name + ' => ' + decision)
        return decision
    }

    getPropertyInItems(uuid: string, items: Item[]) {
        for (let item of items) {
            const prop = this.getPropertyInItem(uuid, item)
            if (prop) {
                return prop
            }
        }
    }

    getPropertyInItem(uuid: string, item: Item): any {
        for (let property of item.properties) {
            if (property.model.uuid === uuid) {
                return property
            }
            if (property.model.type.code === "OBJECT") {
                // console.log(property)
                return this.getPropertyInItem(uuid, property.children[0])
            }
        }
        return null
    }
}
