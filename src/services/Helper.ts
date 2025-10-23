// Utilitaires d'aide
export class Helper {
  /**
   * Vérifie si une valeur est vide
   */
  static empty(value: any): boolean {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim().length === 0
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
  }

  /**
   * Formate une date en chaîne
   */
  static formatDate(date: Date | string | undefined, format = 'DD/MM/YYYY'): string {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    if (isNaN(d.getTime())) return ''

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()

    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', String(year))
  }

  /**
   * Clone profond d'un objet
   */
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj) as any
    if (obj instanceof Array) return obj.map(item => Helper.deepClone(item)) as any

    const cloned = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = Helper.deepClone(obj[key])
      }
    }
    return cloned
  }

  /**
   * Capitalise la première lettre
   */
  static capitalize(str: string): string {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  /**
   * Tronque un texte avec ellipsis
   */
  static truncate(str: string, length: number): string {
    if (!str || str.length <= length) return str
    return str.substring(0, length) + '...'
  }

  /**
   * Formatte un montant en devise
   */
  static formatCurrency(amount: number, currency = 'FCFA'): string {
    const formatted = new Intl.NumberFormat('fr-FR').format(amount)
    return `${formatted} ${currency}`
  }

  /**
   * Génère un UUID simple
   */
  static uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * Debounce une fonction
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null
    return function (this: any, ...args: Parameters<T>) {
      const context = this
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), wait)
    }
  }

  /**
   * Vérifie si un objet a une propriété
   */
  static has(obj: any, path: string): boolean {
    const keys = path.split('.')
    let current = obj
    for (const key of keys) {
      if (!current || !(key in current)) return false
      current = current[key]
    }
    return true
  }

  /**
   * Récupère une valeur profonde d'un objet
   */
  static get(obj: any, path: string, defaultValue?: any): any {
    const keys = path.split('.')
    let current = obj
    for (const key of keys) {
      if (!current || !(key in current)) return defaultValue
      current = current[key]
    }
    return current === undefined ? defaultValue : current
  }

  /**
   * Génère un ID unique aléatoire
   */
  static generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  /**
   * Convertit une chaîne en slug (URL-friendly)
   */
  static slugify(text: string): string {
    if (!text) return ''
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  /**
   * Rend un texte lisible (title case)
   */
  static readable(text: string): string {
    if (!text) return ''
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  /**
   * Formatte un montant en devise (alias pour formatCurrency)
   */
  static currencyFormat(amount: number, currency = 'FCFA'): string {
    return Helper.formatCurrency(amount, currency)
  }

  /**
   * Vérifie si une date est valide
   */
  static isValidDate(date: any): boolean {
    if (!date) return false
    const d = date instanceof Date ? date : new Date(date)
    return !isNaN(d.getTime())
  }
}

// Export d'une instance pour compatibilité
export const helper = Helper
