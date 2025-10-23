/* eslint-disable */
import File from "@/entity/File";
import Customer from "@/entity/Customer";

export default class CallOffer {

    uuid!: string
    createdAt!: Date
    updatedAt!: Date
    expireAt!: Date
    status = ''
    branches = [

        {name: 'Assurance Responsabilité Civile Professionelle', code: 'rcPro', selected: false, icon: 'fad fa-handshake', title: 'RC PRO'},

        {name: 'Assurance Tous risques chantier', code: 'chantier', selected: false, icon: 'fad fa-hard-hat', title: 'Chantier'},

        {name: 'Assurance Multirisque Professionelle', code: 'multirisque', selected: false, icon: 'fad fa-car-building', title: 'Multirisque'},

        {name: 'Assurance Transport', code: 'transport', selected: false, icon: 'fad fa-luggage-cart', title: 'Transport'},

        {name: 'Assurance Auto', code: 'auto', selected: false, icon: 'fad fa-car', title: 'Automobile'},

        {name: 'Assurance Individuel Accident', code: 'iac', selected: false, icon: 'fad fa-wheelchair', title: 'IAC'},

        {name: 'Assurance Santé', code: 'sante', selected: false, icon: 'fad fa-stethoscope', title: 'Santé'},

        {name: 'Assurance Multirisque Habitation', code: 'habitation', selected: false, icon: 'fad fa-home', title: 'Habitation'},


        {name: 'Autres Risques', code: 'other', selected: false, icon: 'fad fa-cogs', title: 'Autre'},
    ]
    insurers = [
        // {name: 'ACTIVA ASSURANCES', logo: '', selected: false},
        // {name: 'GNA', logo: '', selected: false},
        {name: 'ALLIANZ ASSURANCES', logo: '', selected: false},
        {name: 'LA LOYALE', logo: '', selected: false},
        {name: 'AMSA ASSURANCES', logo: '', selected: false},
        {name: 'NSIA', logo: '', selected: false},
        {name: 'ASSURANCES COMAR', logo: '', selected: false},
        {name: 'SANLAM ASSURANCE', logo: '', selected: false},
        {name: 'ATLANTA ASSURANCES', logo: '', selected: false},
        {name: 'SERENITY SA', logo: '', selected: false},
        {name: 'ATLANTIQUE ASSURANCES', logo: '', selected: false},
        {name: 'SUNU ASSURANCES', logo: '', selected: false},
        {name: 'AXA CÔTE D\'IVOIRE', logo: '', selected: false},
        {name: 'WAFA ASSURANCE', logo: '', selected: false},

    ]
    useForm = false
    draft!: File
    more = ''
    data = {
        auto: {
            list: null,
            more: '',
            createdAt: null,
        },
        mrp: {
            createdAt: null,
            form: null,
            online: false,
            onlineForm: {
                valeurBatiment: 0,
                valeurContenu: 0,
                materielExploitation: 0,
                materielBureau: 0,
                materielInformatique: 0,
                stock: 0,
                alarme: false,
                porte: 1,
                protectionPorte: 'Non protégées',
                guardiannage: false,
                extracteur: false,
                extracteurCount: 0,
                borne: false,
                borneCount: 0,
                alarmeIncendie: false,
                alarmeIncendieType: '',
                coupeCircuit: false,
                coupeCircuitCount: 0,
                verified: false,
                dateVerification: null,
                organismeVerification: '',
                garanties: null
            }
        },
        rcPro: {
            createdAt: null,
            form: null,
            online: false,
            onlineForm: {
                ca: {
                    ca_2018: 0,
                    ca_2019: 0,
                    ca_2020: 0,
                },
                personnel: {
                    admin: {
                        count: 0,
                        annuel: 0
                    },
                    com: {
                        count: 0,
                        annuel: 0
                    },
                    fab: {
                        count: 0,
                        annuel: 0
                    },
                    technique: {
                        count: 0,
                        annuel: 0
                    },
                    interimaire: {
                        count: 0,
                        annuel: 0
                    },
                },
                type: {
                    fabriquant: false,
                    grossiste: false,
                    detaillant: false,
                }
            }
        },
        sante: {
            createdAt: null,
            list: null,
            colleges: Array()
        },
        iac: {
            createdAt: null,
            list: null,
            capitaux: Array()
        },
    }
    createByCustomer!: Customer


    constructor(data: any = null) {

        if (data) {
            const keys = Object.keys(this)
            for (let i = 0; i < keys.length; i++) {
                if (data.hasOwnProperty(keys[i])) {
                    // @ts-ignore
                    this[keys[i]] = data[keys[i]]
                }
            }
            if (data.uuid) {
                this.uuid = data.uuid
            }
            if (data.createdAt) {
                this.createdAt = data.createdAt
            }
            if (data.updatedAt) {
                this.updatedAt = data.updatedAt
            }
            if (data.expireAt) {
                this.expireAt = new Date(data.expireAt)
            }
            if (data.status) {
                this.status = data.status
            }
            if (data.branches) {
                this.branches = data.branches
            }
            if (data.insurers) {
                this.insurers = data.insurers
            }
            if (data.draft) {
                this.draft = new File(data.draft)
            }
            if (data.more) {
                this.more = data.more
            }
            if (data.data) {
                this.data = data.data
            }
            if (data.useForm) {
                this.useForm = data.useForm
            }
            if (data.createByCustomer) {
                this.createByCustomer = new Customer(data.createByCustomer)
            }
        }
    }

    get isEdit() {
        // console.log(this.empty(this.uuid))
        // console.log(this.uuid)
        return !this.empty(this.uuid)
    }

    get isBranchesSelected() {
        let res = false
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].selected) {
                res = true
            }
        }
        return res
    }

    get isInsurerSelected() {
        let res = false
        for (let i = 0; i < this.insurers.length; i++) {
            if (this.insurers[i].selected) {
                res = true
            }
        }
        return res
    }


    empty(data: string | undefined): boolean {
        return data === null || data === undefined || data.length === 0
    }

    validateConfiguration() {
        if (!this.isBranchesSelected) {
            return 'Aucune branche d\'assurance n\'a été selectionnée'
        }
        if (!this.isInsurerSelected) {
            return 'Aucun assureur n\'a été selectionné'
        }
        if (!this.useForm && !this.draft) {
            return 'Votre document d\'appel d\'offre est manquant'
        }
        if (!this.expireAt) {
            return 'Veuillez spécifier une date de clotûre'
        }
        return true;
    }

    validateCar() {
        if (!this.data.auto.list) {
            return 'La liste des véhicules est manquante'
        }
        return true
    }

    validateMultirisque() {
        if (!this.data.mrp.online && !this.data.mrp.form) {
            return 'Le formulaire est manquant'
        }
        if (this.data.mrp.online) {
            return 'Le formulaire est incomplet'
        }

        return true
    }

    validateRc() {
        if (!this.data.rcPro.online && !this.data.rcPro.form) {
            return 'Le formulaire est manquant'
        }
        if (this.data.rcPro.online) {
            return 'Le formulaire est incomplet'
        }

        return true
    }

    validateSante() {
        if (!this.data.sante.list) {
            return 'La liste du personnel est manquante'
        }

        const colleges = this.data.sante.colleges
        for (let i = 0; i < colleges.length; i++) {
            const college = colleges[i]
            let id = college.name
            if (this.empty(id)) {
                id = 'N°' + i
            }
            if (college.nombre <= 0) {
                return 'Entrez un nombre d\'assuré valide pour le collège "' + id + '"'
            }
            if (college.taux !== '80%' && college.taux !== '100%') {
                return 'Selectionnez un taux valide pour le collège "' + id + '"'
            }
            if (college.reseau !== 'Economique' && college.reseau !== 'Premium') {
                return 'Selectionnez un reseau valide pour le collège "' + id + '"'
            }
            if (this.empty(college.etendue)) {
                return 'Selectionnez une zone géographique valide pour le collège "' + id + '"'
            }
        }

        return true
    }

    validateIac() {
        if (!this.data.iac.list) {
            return 'Le formulaire est manquant'
        }
        const capitaux = this.data.iac.capitaux
        let selectCount = 0
        for (let i = 0; i < capitaux.length; i++) {
            const capital = capitaux[i]
            let id = capital.name
            if (capital.selected) {
                selectCount++
                if (capital.amount <= 0) {
                    return 'Entrez un montant pour le capital "' + id + '"'
                }
                if (capital.count <= 0) {
                    return 'Entrez un nombre d\'assuré valide pour le collège "' + id + '"'
                }
            }
        }
        if (selectCount === 0) {
            return 'Aucun capital n\'a été selectionné'
        }

        return true
    }

    validateBranch(branch: any) {
        if (branch.code === 'auto') {
            return this.validateCar()
        } else if (branch.code === 'rcPro') {
            return this.validateRc()
        } else if (branch.code === 'sante') {
            return this.validateSante()
        } else if (branch.code === 'multirisque') {
            return this.validateMultirisque()
        } else if (branch.code === 'iac') {
            return this.validateIac()
        } else {
            return true
        }

    }
}
