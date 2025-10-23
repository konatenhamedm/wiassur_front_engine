/* eslint-disabled */

import Response from "@/entity/Response";

export default class ResponseExtend {

    public currentValue ? = ''
    public responseGroupUuid = ''
    public questionUuid = ''
    public questionLabel = ''
    public surveySlug = ''
    public branchSlug = ''


    constructor(object?: any) {
        if (object) {
            this.currentValue = object.value
            this.responseGroupUuid = object.responseGroupUuid
            this.surveySlug = object.surveySlug
            this.branchSlug = object.branchSlug
            this.questionUuid = object.questionUuid
            this.questionLabel = object.questionLabel
        }
    }

    // get responseGroup() {
    //     const self: Response = this as any
    //     if (self._responseGroup) {
    //         return self._responseGroup
    //     }
    //     // console.log(this.responseGroupUuid)
    //     // console.log(store.state.rgs)
    //     const index = store.state.rgs.findIndex((saved: ResponseGroup) => {
    //         // console.log('###' + saved.uuid)
    //         return saved.uuid === this.responseGroupUuid
    //     })
    //     if (index !== -1) {
    //         self._responseGroup = store.state.rgs[index]
    //         return store.state.rgs[index]
    //     }
    //     return null;
    // }


    simplify() {
        const self: Response = this as any
        return {
            id: self.id,
            uuid: self.uuid,
            comment: self.comment,
            value: self.value,
            responseGroups: self.responseGroups,
            responseGroupUuid: self.responseGroupUuid,
            questionUuid: self.questionUuid,
            questionLabel: self.questionLabel,
            branchSlug: self.branchSlug,
            surveySlug: self.surveySlug,
            currentValue: self.currentValue
        }
    }
}
