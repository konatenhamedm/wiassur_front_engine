/* eslint-disabled */

import Role from "../Role";

export default class RoleExtend {

  public sub: Array<Role> = [];
  public parent = ''

  constructor(object?: any) {
    if (object) {
      if (object.sub && Array.isArray(object.sub) ) {
        object.sub.forEach((occ: any) => {
          const r = new Role(occ);
          this.sub.push(r);
        });
        this.parent = object.parent
      }
    }
  }

  getlist(result: string[] = []) {
    const self: Role = this as any
    if (!result.includes(self.code)) {
      result.push(self.code)
    }
    self.sub.forEach((r: Role) => {
      r.getlist(result)
    })
    return result
  }

  getRolelist(result: Role[] = []) {
    const self: Role = this as any
    if (!result.includes(self)) {
      result.push(self)
    }
    self.sub.forEach((r: Role) => {
      r.getRolelist(result)
    })
    result.sort((a, b) => a.label.localeCompare(b.label));
    return result
  }

  findByCode(code: string) {
    const self: Role = this as any
    if (self.code === code) {
      return self
    }
    for (let role of self.sub) {
      const res: any = role.findByCode(code)
      if (res) {
        return res
      }
    }
    return null
  }

  postConstruct() { }
}
