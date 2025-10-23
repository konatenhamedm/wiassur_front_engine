/* eslint-disabled */

import Item from "@/entity/Item";
import Property from "@/entity/Property";
import {helper} from "@/services/Helper";
import ItemGuarantee from "@/entity/ItemGuarantee";
import store from "@/store";
import ItemType from "@/entity/ItemType";
import Pack from "@/entity/Pack";
import PremiumDetail from "@/entity/PremiumDetail";
import Avenant from "@/entity/Avenant";
import {api} from "@/services/api";
import PackGuarantee from "@/entity/PackGuarantee";
import ResponseGroup from "@/entity/ResponseGroup";
import Survey from "@/entity/Survey";

export default class ItemExtend {
    expand = true;
    parentItem?: Item;
    uuid = ''
    level = 0;
    public beneficiary?: Item;
    public premiumDetails: PremiumDetail[] = [];
    itemsIn: Item[] = [];
    itemsOut: Item[] = [];
    optionalsState = [];
    responseGroup?: ResponseGroup;
    survey?: Survey;
    parentUuid = "";
    parentAlias = "";
    pseudoUuid?: any = "";

    constructor(object?: any) {
        if (object) {
            if (object.beneficiary) {
                // console.log(object.beneficiary)
                this.beneficiary =
                    object.beneficiary instanceof Item
                        ? object.beneficiary
                        : object.beneficiary
                            ? new Item(object.beneficiary)
                            : null;
            }
            this.parentAlias = object.parentAlias;
            this.parentUuid = object.parentUuid;
            this.responseGroup = object.responseGroup;
            this.survey = object.survey;
            if (!this.beneficiary && object.owner) {
                // console.log(object.owner)
                this.beneficiary =
                    object.owner instanceof Item
                        ? object.owner
                        : object.owner
                            ? new Item(object.owner)
                            : null;
            }
            // console.log(this.beneficiary)
            if (object.premiumDetails) {
                object.premiumDetails.forEach((occ: any) => {
                    const premiumdetail =
                        occ instanceof PremiumDetail ? occ : new PremiumDetail(occ);
                    this.premiumDetails.push(premiumdetail);
                });
            }

            if (helper.empty(object.uuid)) {
                this.uuid = helper.generateId();
            }
        }
    }

    get beneficiaryIdentifier() {
        let identifier: any = "";
        let email = "";
        if (this.beneficiary instanceof Item) {
            this.beneficiary.properties.forEach((p: Property) => {
                if (p.model.link) {
                    if (p.model.link!.match(/name|prename/)) {
                        if (!helper.empty(identifier)) {
                            identifier += " ";
                        }
                        if (!helper.empty(p.value)) {
                            identifier += p.value;
                        }
                    } else if (p.model.link!.match(/email/) && !helper.empty(p.value)) {
                        email = p.value as any;
                    }
                }
            });
            if (helper.empty(identifier)) {
                if (!helper.empty(this.beneficiary.defaultAlias)) {
                    identifier = this.beneficiary.defaultAlias;
                } else {
                    identifier = email;
                }
            }
            if (
                helper.empty(identifier) &&
                !helper.empty(this.beneficiary.generatedAlias)
            ) {
                identifier += this.beneficiary.generatedAlias;
            }
        }

        return identifier;
    }

    get beneficiaryFullName() {
        let identifier = "";
        if (this.beneficiary instanceof Item) {
            this.beneficiary.properties.forEach((p: Property) => {
                if (p.model.link === "name" || p.model.link === "prename") {
                    if (!helper.empty(identifier)) {
                        identifier += " ";
                    }
                    identifier += p.value;
                }
            });
        }
        return identifier;
    }

    async getRoot(avenant: Avenant) {
        const res = await api.get(api.core, "avenant/get/root/" + avenant.uuid);
        console.log(res);
    }

    get beneficiaryEmail() {
        let email = "";
        if (this.beneficiary instanceof Item) {
            this.beneficiary.properties.forEach((p: Property) => {
                if (p.model.link === "email") {
                    email += p.value;
                }
            });
        }
        return email;
    }

    get beneficiaryPhoto() {
        let photo: any = null;
        if (this.beneficiary instanceof Item) {
            this.beneficiary.properties.forEach((p: Property) => {
                if (p.model.link === "photo") {
                    photo = p.value;
                }
            });
        }
        return photo;
    }

    get alias() {
        const self: Item = this as any;
        if (!helper.empty(self.defaultAlias)) {
            return self.defaultAlias;
        }
        if (!helper.empty(self.generatedAlias)) {
            return self.generatedAlias;
        }
        if (!helper.empty(self.identifier)) {
            return self.identifier;
        }
        return null;
        // return self.model.code
    }

    get identifier() {
        let identifier = "";
        let email = "";
        const self: Item = this as any;
        self.properties.forEach((p: Property) => {
            if (p.model.identifier) {
                identifier = (identifier + ' ' + p.value)
            }
            // if (p.model.link) {
            //     if (p.model.link!.match(/name|prename/)) {
            //         if (!helper.empty(identifier)) {
            //             identifier += " ";
            //         }
            //         if (!helper.empty(p.value)) {
            //             identifier += p.value;
            //         }
            //     } else if (p.model.link!.match(/email/)) {
            //         email = p.value as any;
            //     }
            // }
        });
        if (helper.empty(identifier)) {
            if (self.defaultAlias) {
                identifier = self.defaultAlias;
            } else {
                identifier = email;
            }
        }
        if (helper.empty(identifier)) {
            identifier += this.generatedAlias;
        }
        return identifier;
    }

    getPropByCode(name: string) {
        let value: any = null;
        const self: Item = this as any;
        self.properties.forEach((p: Property) => {
            if (p.model.code.toUpperCase() === name.toUpperCase()) {
                value = p.value;
            }
        });
        return value;
    }

    get generatedAlias() {
        const self: Item = this as any;
        if (!helper.empty(self.defaultAlias)) {
            return self.defaultAlias;
        }

        let generated = "";
        self.properties.forEach((p: Property) => {
            if (p.model.isAlias) {
                if (p.model.type.code !== "OBJECT") {
                    if (p.model.isAlias && !helper.empty(p.value)) {
                        generated += " " + p.value;
                    }
                } else {
                    if (
                        p.children.length > 0 &&
                        !helper.empty(p.children[0].generatedAlias)
                    ) {
                        generated += p.children[0].generatedAlias as any;
                    }
                }
            }
        });
        return generated.trim();
    }

    getPropertyByCode(name: string) {
        let value: any = null;
        const self: Item = this as any;
        self.properties.forEach((p: Property) => {
            if (p.model.code.toUpperCase() === name.toUpperCase()) {
                value = p;
            }
        });
        return value;
    }

    getPropertyByLink(name: string) {
        let value: any = null;
        const self: Item = this as any;
        self.properties.forEach((p: Property) => {
            if (p.model.link && p.model.link.toUpperCase() === name.toUpperCase()) {
                value = p;
            }
        });
        return value;
    }

    setPropertyByCode(name: string, value: any) {
        const self: Item = this as any;
        self.properties.forEach((p: Property) => {
            if (p.model.code.toUpperCase() === name.toUpperCase()) {
                p.value = value;
            }
        });
    }

    postConstruct() {
        const self: Item = this as any;

        if (helper.empty(self.uuid)) {
            self.uuid = helper.generateId();
        }
        if (self.model) {
            const m = store.state.itemTypes.find((i: ItemType) => {
                return i.id === self.model.id;
            });
            if (m) {
                self.model = m;
            }

            if (self.pack) {
                const p = store.state.packs.find((i: Pack) => {
                    return i.id === self.pack!.id;
                });
                if (p) {
                    self.pack = new Pack(JSON.parse(JSON.stringify(p)));
                }
            }
        }
    }

    simplify() {
        const self: Item = this as any;
        const simplified = {
            name: self.name,
            details: self.details,
            model: {
                id: self.model!.id,
                name: self.model!.name,
                code: self.model!.code,
                uuid: self.model!.uuid,
                className: self.model.className,
                required: self.model.required,
                isRoot: self.model.isRoot,
                isPackApplier: self.model.isPackApplier,
                method: self.model.method,
                asaciWorkflow: self.model.asaciWorkflow,
            },
            defaultAlias: self.defaultAlias,
            generatedAlias: self.generatedAlias,
            premiumDetails: self.premiumDetails,
            pack: null as any,
            uuid: self.uuid,
            premium: self.premium,
            id: self.id,
            properties: [] as any,
            guarantees: [] as any,
            params: self.params,
        };
        self.properties.forEach((p: Property) => {
            simplified.properties.push(p.simplify());
        });

        // if (self.pack instanceof Pack) {
        //     simplified.pack = {id: self.pack.id, uuid: self.pack.uuid}
        // }
        if (
            (self.model.isPackApplier || self.model.className === "Asset") &&
            self.pack &&
            self.pack.id
        ) {
            // console.log('export pack ' + self.name)
            simplified.pack = {id: self.pack.id, uuid: self.pack.uuid};
            // simplified.pack = new Pack(JSON.parse(JSON.stringify(self.pack)));
        }

        if (self.model!.isPackApplier || self.model!.className === "Asset") {
            self.guarantees.forEach((g: ItemGuarantee) => {
                let method = null;
                if (g.guarantee && g.guarantee.method) {
                    method = {
                        id: g.guarantee.method.id,
                        label: g.guarantee.method.label,
                        code: g.guarantee.method.code,
                    };
                }
                simplified.guarantees.push({
                    id: g.id,
                    label: g.label,
                    icon: g.icon,
                    description: g.description,
                    ceiling: g.ceiling,
                    deductible: g.deductible,
                    guarantee: {
                        id: g.guarantee!.id,
                        label: g.guarantee!.label,
                        method: method,
                    },
                    isOptional: g.isOptional,
                    premium: g.premium,
                    uuid: g.uuid,
                });
            });
        }
        // console.log(simplified)
        return simplified;
    }

    get calculatedPremium() {
        const self: Item = this as any;
        if (self.premium !== null && self.premium !== undefined) {
            return self.premium;
        }
        let premium = 0;
        self.properties.forEach((p: Property) => {
            p.children.forEach((c: Item) => {
                premium += c.calculatedPremium;
            });
        });
        return premium;
    }

    updateChildrenOptionals(item?: Item) {
        const self: Item = this as any;

        if (
            item &&
            (self.model.isPackApplier || self.model.className === "Asset")
        ) {
            // console.log('update optional garanties de ' + self.generatedAlias)
            // console.log(item.optionalsState)
            self.optionalsState = item.optionalsState;
        }
        let source: any = null;
        if (self.optionalsState.length > 0) {
            source = self;
        }
        if (!source && item && item.optionalsState.length > 0) {
            source = item;
        }
        if (source) {
            self.properties.forEach((p: Property) => {
                if (p.model.type.code.match(/OBJECT/)) {
                    p.children.forEach((c: Item) => {
                        c.setChildrenPack(source);
                    });
                }
            });
        } else {
        }
    }

    setChildrenPack(item?: Item, force = false) {
        const self: Item = this as any;
        const optionals: number[] = [];
        if (!item) {
            item = new Item(self.simplify());
        }
        // console.log(self)
        // console.log(item)
        let pack: any = item.pack;
        if (item.pack) {
            for (let insurer of store.state.insurers) {
                for (let p of insurer.packs) {
                    if (p.id === item.pack!.id || p.uuid === item.pack!.uuid) {
                        item.pack = p;
                    }
                }
            }
        }
        if (
            item &&
            item.pack &&
            (item.model.isPackApplier || item.model.className === "Asset" || force)
        ) {
            self.pack = item.pack;
            self.guarantees = [];
            // console.log('=>setting guarantees ' + self.name+' from '+item.name)
            // console.log(item.guarantees)
            item.guarantees.forEach((ig: ItemGuarantee) => {
                // console.log('add guarantee '+ig.guarantee.label+' --- '+ig.guarantee.id)
                const occ = new ItemGuarantee();
                occ.label = ig.guarantee!.label;
                occ.ceiling = ig.ceiling;
                occ.deductible = ig.deductible;
                occ.description = ig.guarantee!.description;
                occ.guarantee = {...ig.guarantee} as any;
                occ.isOptional = ig.isOptional;
                self.guarantees.push(occ);
                if (ig.isOptional) {
                    optionals.push(ig.guarantee.id);
                }
            });
        } else {
            // console.log('--------------------------')
            // console.log('avoid setting pack')
            // console.log(item)
            // console.log(self)
            // console.log(self.model.isPackApplier)
            // console.log(self.model.className)
            // console.log(force)
        }
        pack = null;
        let source: any = null;

        if (item && item.pack) {
            pack = item.pack;
            source = item;
        }
        if (!pack && self.pack) {
            pack = self.pack;
            source = self;
        }

        if (pack) {
            // if(!(pack instanceof Pack)){

            // }
            const value = {
                pack: {id: pack.id, code: pack.code},
                insurer: {id: pack.insurer!.id, slug: pack.insurer!.slug},
                optionals: optionals,
            };
            // console.log(value)
            self.properties.forEach((p: Property) => {
                if (p.model.type.code.match(/OBJECT/)) {
                    // console.log('la prop ' + p.name + ' nous interesse')
                    p.children.forEach((c: Item) => {
                        c.setChildrenPack(source);
                    });
                }
                if (p.model.code === "pack") {
                    // console.log('setting pack value '+self.name)
                    // console.log(value)
                    p.value = JSON.stringify(value);
                }
            });
        } else {
        }
    }

    getAssetCount(count = 0) {
        const self: Item = this as any;
        if (self.model.className === "Asset") {
            count++;
        }
        self.properties.forEach((p: Property) => {
            if (p.model.type.code.match(/OBJECT/)) {
                p.children.forEach((c: Item) => {
                    const sc = c.getAssetCount();
                    count += sc;
                });
            }
        });
        return count;
    }

    getAssetAliases(aliases = "") {
        const self: Item = this as any;
        if (self.model.className === "Asset") {
            aliases += self.generatedAlias;
        }
        self.properties.forEach((p: Property) => {
            if (p.model.type.code.match(/OBJECT/)) {
                p.children.forEach((c: Item) => {
                    const alias = c.getAssetAliases().trim();
                    if (alias.length > 0) {
                        if (aliases.length > 0) {
                            aliases += ", ";
                        }
                        aliases += alias;
                    }
                });
            }
        });
        return aliases;
    }

    getAssetUuids() {
        let uuids: string[] = [];
        const self: Item = this as any;
        if (self.model.className === "Asset") {
            uuids.push(self.uuid);
        }
        self.properties.forEach((p: Property) => {
            if (p.model.type.code.match(/OBJECT/)) {
                p.children.forEach((c: Item) => {
                    const suuids: string[] = c.getAssetUuids();
                    uuids = uuids.concat(suuids);
                });
            }
        });
        return uuids;
    }

    getAssetCountWithoutPackApplier(count = 0) {
        const self: Item = this as any;
        if (self.model.className === "Asset") {
            count++;
        }
        if (!self.model.isPackApplier) {
            self.properties.forEach((p: Property) => {
                if (p.model.type.code.match(/OBJECT/)) {
                    p.children.forEach((c: Item) => {
                        const sc = c.getAssetCount();
                        count += sc;
                    });
                }
            });
        }
        return count;
    }

    // toJSON() {
    //     return JSON.stringify(this.simplify())
    // }
}
