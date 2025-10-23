/* eslint-disabled */

import Branch from "@/entity/Branch";
import EngineMethod from "@/entity/EngineMethod";
import EngineMethodLine from "@/entity/EngineMethodLine";
import EngineMethodRequirement from "@/entity/EngineMethodRequirement";
import {helper} from "@/services/Helper";

export default class EngineMethodExtend {


    branch: Branch | null = null


    constructor(object?: any) {
        if (object) {
            if (object.branch) {
                this.branch = object.branch instanceof Branch ? object.branch : new Branch(object.branch)
            }
        }
    }

    postConstruct() {
    }

    getLineByGid(uuid: string) {
        const self: EngineMethod = this as any
        let match = null
        self.methodLines.forEach((m: EngineMethodLine) => {
            const found = m.findUuid(uuid)
            if (found) {
                match = found
            }
        })
        return match
    }

    generateCode() {
        let lines: any[] = []
        const self: EngineMethod = this as any
        if (self.methodLines.length > 0) {
            let line: string = self.code + ' (';
            self.requirements.forEach((r: EngineMethodRequirement, index) => {
                if (index > 0) {
                    line += ','
                }
                line += r.code
            })
            line += ') {'
            lines.push(line)
            self.methodLines.forEach((m: EngineMethodLine) => {
                m.generateCode(lines)
            })
            line = '}'
            lines.push(line)
            self.body = lines.join('\n')
        } else if (helper.empty(self.body)) {
            let line = self.code + ' (';
            self.requirements.forEach((r: EngineMethodRequirement, index) => {
                if (index > 0) {
                    line += ','
                }
                line += r.code
            })
            line += ') {'
            lines.push(line)
            line = '}'
            lines.push(line)
            self.body = lines.join('\n')
        }

    }
}
