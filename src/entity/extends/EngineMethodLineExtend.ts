/* eslint-disabled */

import EngineMethodLine from "@/entity/EngineMethodLine";
import EngineArgument from "@/entity/EngineArgument";
import {helper} from "@/services/Helper";
import EnginePlace from "@/entity/EnginePlace";
import EngineMethodRequirement from "@/entity/EngineMethodRequirement";
import EngineConditionGroup from "@/entity/EngineConditionGroup";
import EngineCondition from "@/entity/EngineCondition";
import store from "@/store";
import EngineMethod from "@/entity/EngineMethod";

export default class EngineMethodLineExtend {
    public uuid = helper.generateId();
    public ranking = 1
    public number = 1
    public subLines: EngineMethodLine[] = []
    public parent: any = null

    public foreachArgument?: EngineArgument;
    public isValid = false
    public places: Array<EnginePlace> = []
    errors: string[] = []
    public code = ''


    constructor(object?: any) {
        if (object) {
            object.subLines.forEach((l: EngineMethodLine) => {
                const occ = new EngineMethodLine(l);
                occ.parent = this.uuid
                this.subLines.push(occ)
            })
            this.uuid = object.uuid
            if (object.places) {
                object.places.forEach((occ: any) => {
                    const place = occ instanceof EnginePlace ? occ : new EnginePlace(occ);
                    this.places.push(place);
                });
            }

            this.foreachArgument = (object.foreachArgument instanceof EngineArgument) ? object.foreachArgument : object.foreachArgument ? new EngineArgument(object.foreachArgument) : object.foreachArgument;
        }
    }

    postConstruct() {
    }

    removeArgument(occ: EngineArgument) {
        const self: EngineMethodLine = this as any


        const places = self.places.filter((a: EnginePlace) => a.argument.uuid !== occ.uuid)
        // var indices = self.arguments.map((e, i) => e.gid === occ.gid ? i : '').filter(String)

        self.places = places
        // const index = self.arguments.findIndex((a: EngineArgument) => {
        //     return a.gid === occ.gid
        // })

        // if (index !== -1) {
        //     self.arguments.splice(index, 1)
        //     console.log('remove from arguments of line ' + this.number)
        // }
        if (this.foreachArgument && this.foreachArgument.uuid === occ.uuid) {
            this.foreachArgument = undefined
            // console.log('remove from foreach argument of line ' + this.number)
        }

        this.subLines.forEach((sb: EngineMethodLine) => {
            sb.removeArgument(occ)
        })
    }

    check() {
        this.errors = []
        const self: EngineMethodLine = this as any
        switch (self.type) {
            case 'condition': {
                this.checkCondition()
                break
            }
            case 'foreach': {
                this.checkForeach()
                break
            }
            case 'callable': {
                this.checkCalllable()
                break
            }
            default: {
                this.checkDefault()
                break
            }
        }
    }

    checkDefault() {
        if (this.places.length === 0) {
            this.errors.push('Ligne vide');
        }
        this.places.forEach((a: EnginePlace, index) => {
            if (!a.symbol && index > 0) {
                this.errors.push('Aucun opérateur défini avant le paramètre N°' + (index + 1) + ' "' + a.argument.name + '"')
            }
        })

        this.isValid = this.errors.length === 0
    }

    checkCondition() {

    }

    checkForeach() {
        const self: EngineMethodLine = this as any

        if (!this.foreachArgument) {
            this.errors.push('Selectionnez un paramètre de type "Groupe d\'objets"');
        }
        if (!self.callable) {
            this.errors.push('Selectionnez un calcul')
        }
        this.places.forEach((a: EnginePlace, index) => {
            if (!a.argument) {
                this.errors.push('L\'un des paramètres est mal configuré')
            }
        })
        if (self.callable) {
            self.callable.requirements.forEach((r: EngineMethodRequirement) => {
                const matchReq = self.places.find((a: EnginePlace) => {
                    return a.requirement === r.id
                })
                if (!(matchReq instanceof EnginePlace)) {
                    this.errors.push('Paramètre manquant pour l\'entrée ' + r.label)
                }
            })
        }
        this.isValid = this.errors.length === 0
    }

    checkCalllable() {
        const self: EngineMethodLine = this as any
        if (!self.callable) {
            this.errors.push('Selectionnez un calcul')
        }
        if (self.callable) {
            self.callable.requirements.forEach((r: EngineMethodRequirement) => {
                const matchReq = self.places.find((a: EnginePlace) => {
                    return a.requirement === r.id
                })
                if (!(matchReq instanceof EnginePlace)) {
                    this.errors.push('Paramètre manquant pour l\'entrée ' + r.label)
                }
            })
        }
        this.isValid = this.errors.length === 0
    }

    generateCode(lines: any[], level = 1) {
        const self: EngineMethodLine = this as any
        switch (self.type) {
            case 'condition': {
                this.generateConditionLineCode(lines, level)
                break
            }
            case 'default': {
                this.generateDefaultLineCode(lines, level)
                break
            }
        }
    }

    generateDefaultLineCode(lines: any[], level: number) {
        const self: EngineMethodLine = this as any
        let line = ''

        if (self.isResult) {
            line += 'return ';
        } else if (self.returnArgument) {
            if (self.returnArgument.resultOfLine === self.uuid) {
                line += 'let '
            }
            line += self.returnArgument.variableCode + ' = '
        }
        let offset = ''
        for (var i = 0; i < level; i++) {
            offset += '    ';
        }
        line = offset + line

        self.places.forEach((place: EnginePlace, index) => {
            if (index > 0) {
                line += place.symbol
            }
            if (place.argument.type.code === 'CALLABLE') {

                line += place.argument.variableCode + ' ('
                const callable = this.getCallableById(place.argument.id)
                callable.requirements.forEach((req: EngineMethodRequirement) => {
                    const callablePlace = place.callableArgumentPlaces.find((a: EnginePlace) => {
                        return a.requirement === req.id
                    })
                    if (callablePlace) {
                        line += callablePlace.argument.code
                    }
                })
                line += ')'
            } else {
                line += ' ' + place.argument.variableCode + ' '
            }

        })
        lines.push(line)
    }

    getCallableById(id: number) {
        return store.state.engineMethods.find((method: EngineMethod) => {
            return method.id === id
        })
    }

    generateConditionLineCode(lines: any[], level: number) {
        const self: EngineMethodLine = this as any
        let line = 'if ('
        self.conditionGroups.forEach((group: EngineConditionGroup, gindex) => {
            if (gindex > 0) {
                line += ' || '
            }

            if (self.conditionGroups.length > 1) {
                line += '('
            }
            group.conditions.forEach((c: EngineCondition, cindex) => {
                if (cindex > 0) {
                    line += ' && '
                }
                line += c.first.variableCode + ' ' + c.operator.symbol + ' '
                if (c.first.type.format === 'NUMBER') {
                    line += parseFloat(c.second)
                } else if (c.first.type.code === 'RADIO') {
                    line += '\'' + c.second.code + '\''
                } else if (c.first.type.code === 'BOOLEAN') {
                    line += c.second ? "true" : "false"
                }

            })
            if (self.conditionGroups.length > 1) {
                line += ')'
            }
        })
        let offset = ''
        for (var i = 0; i < level; i++) {
            offset += '    ';
        }
        line += '){'
        line = offset + line
        lines.push(line)
        level++
        self.subLines.forEach((sb: EngineMethodLine) => {
            sb.generateCode(lines, level)
        })
        lines.push(offset + '}')
    }

    findUuid(uuid: string) {
        if (this.uuid === uuid) {
            return this;
        } else {
            // console.log(this.uuid + ' !== ' + uuid)
        }
        let match = null
        this.subLines.forEach((sb: EngineMethodLine) => {
            const found = sb.findUuid(uuid)
            if (found) {
                match = found
            }
        })
        return match
    }
}
